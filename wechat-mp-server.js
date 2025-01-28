'use strict';

const http = require('http');
const url = require('url');
const xml2js = require('xml2js');
const fs = require('fs');
const cron = require("node-cron");
const io = require('./io')
const axios = require("axios");

console.log('');
console.log('Echo Server');
console.log('');

let onReq = function (req, res) {
    console.debug('Received %s request %s with header %s', req.method, req.url, JSON.stringify(req.headers));

    res.statusCode = 200;
    if (req.method === 'GET' || req.method === 'DELETE') {
        let query = parseUrl(req).query;
        console.debug('With query %j', query);
        if (query.echostr) {
            res.write(query.echostr);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(query));
        }
        res.end();
    } else if (req.method === 'POST' || req.method === 'PUT') {
        parsePostData(req, res, function(req, res, data) {
            console.debug('with data %j', data);
            xml2js.parseString(data, function (err, result) {
                if (result && result.xml && result.xml.MsgType && result.xml.MsgType[0] === 'text') {
                    const content = result.xml.Content[0];
                    const prefix = content.split(' ')[0].toLowerCase();
                    const fromUser = result.xml.FromUserName[0];
                    let handler;
                    try {
                        handler = require('./scripts/' + prefix);
                    } catch (err) {
                        if (content.length === 4 && content.indexOf('蛇') > -1) {
                            handler = require('./scripts/lot');
                        } else if (content.length === 1 && /[\u4e00-\u9fa5]/.test(content)) {
                            handler = require('./scripts/bishun');
                        } else if (content.startsWith('钉钉 ')) {
                            handler = require('./scripts/dingtalk');
                        } else if (content.startsWith('简书')) {
                            handler = require('./scripts/jianshu');
                        } else if (content.startsWith('公众号')) {
                            handler = require('./scripts/wechat-mp');
                        } else if (content.startsWith('字帖')) {
                            handler = require('./scripts/zitie');
                        } else if (content.indexOf('接龙') > -1) {
                            handler = require('./scripts/jielong');
                        } else if (content.indexOf('土味情话') > -1) {
                            handler = require('./scripts/tuweiqinghua');
                        } else {
                            handler = require('./scripts/echo');
                        }
                    }
                    handler.envelop = (msg, type) => {
                        res.setHeader('Content-Type', req.headers['content-type']);
                        if (!type || type === 'text') {
                            res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], msg));
                        } else if (type === 'image') {
                            res.write(buildImageMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], msg));
                        }
                        res.end();
                    };
                    handler.response(content, fromUser);
                } else if (result && result.xml && result.xml.MsgType && result.xml.MsgType[0] === 'event') {
                    let welcome = "欢迎关注 AlphaHinex !\r\n";
                    welcome += "本公众号为 IT 技术主题公众号。\r\n";
                    welcome += "自动回复内容包括：\r\n";
                    welcome += "1. 关注时回复欢迎消息\r\n";
                    welcome += "2. 回声功能：对任何发送给公众号的文本消息，回复 “发送内容, you said.”；其他类型的消息回复 “Not support yet.”\r\n";
                    welcome += "3. 十大 Hacker News：发送 hn 关键字，不区分大小写，回复当时 Hacker News RSS 中的前十条内容\r\n";
                    welcome += "4. 抽奖：发送带“蛇”字的四字消息，抽取随机金额\r\n";
                    welcome += "5. Base64 编解码：发送 base64 encode xxxx 进行编码，或者 base64 decode xxxx 进行解码\r\n";
                    res.setHeader('Content-Type', req.headers['content-type']);
                    res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], welcome));
                    res.end();
                } else if (result && result.xml && result.xml.MsgType) {
                    res.setHeader('Content-Type', req.headers['content-type']);
                    res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], "Not support yet."));
                    res.end();
                } else {
                    if (req.headers['content-type']) {
                        res.setHeader('Content-Type', req.headers['content-type']);
                    }
                    res.write(data);
                    res.end();
                }
            });
        });
    } else {
        res.write('echo at ' + new Date().toGMTString());
        res.end();
    }
};

let parseUrl = function(req) {
    return url.parse(req.url, true);
};

let parsePostData = function(req, res, callback) {
    let postData = '';
    req.addListener('data', function(chunk) {
        postData += chunk;
    });
    req.addListener('end', function() {
        let data = postData;
        try {
            data = JSON.parse(postData);
        } catch(err) { }
        callback(req, res, data);
    });
};

const builder = new xml2js.Builder({headless: true, cdata: true, renderOpts: {pretty: false}});
let buildTextMsg = function (from, to, content) {
    let obj = {xml: {
            ToUserName: to,
            FromUserName: from,
            CreateTime: new Date().getTime(),
            MsgType: 'text',
            Content: content
        }};
    let resp = builder.buildObject(obj);
    console.debug("Response with %j", resp);
    return resp;
};
let buildImageMsg = function (from, to, mediaId) {
    let obj = {xml: {
            ToUserName: to,
            FromUserName: from,
            CreateTime: new Date().getTime(),
            MsgType: 'image',
            Image: {MediaId: mediaId}
        }};
    let resp = builder.buildObject(obj);
    console.debug("Response with %j", resp);
    return resp;
};

const httpServer = http.createServer(onReq);

io.server.attach(httpServer);

httpServer.listen(process.env.PORT || 8080);

let downloadSearchXml = () => {
    axios({
        url: 'https://alphahinex.github.io/search.xml',
        headers: {
            'Content-Type': 'application/xml;charset=utf-8'
        }
    }).then(function (response) {
        if (response.status === 200) {
            fs.writeFileSync('./search.xml', response.data);
        } else {
            console.error(response);
        }
    });
};

downloadSearchXml();

// https://www.npmjs.com/package/node-cron
cron.schedule("0 9 * * *", () => {
    let handler = require('./scripts/jianshu');
    handler.envelop = () => {};
    handler.response('简书');

    downloadSearchXml();
}, { timezone: 'Asia/Shanghai' });

cron.schedule("0 7,13,22 * * *", () => {
// cron.schedule("0 8,13,21 * * *", () => {
    let handler = require('./scripts/hn');
    handler.envelop = () => {};
    handler.response('hn');
}, { timezone: 'Asia/Shanghai' });
