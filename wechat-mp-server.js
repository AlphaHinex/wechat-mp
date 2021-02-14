'use strict';

var http = require('http');
var https = require('https');
var url = require('url');
var xml2js = require('xml2js');

console.log('');
console.log('Echo Server');
console.log('');

String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

let getSubscribeDate = (key) => {
    return Date.now() - Math.random() * 24 * 60 * 60 * 1000;
};
let baseByDays = function(key) {
    return (Date.now() - getSubscribeDate(key)) / 1000 / 60 / 60 / 24 / 10;
};

const goodWords = [
    '青牛紫气', '牛气冲天', '牛运亨通', '牛势冲盘', '财如牛毛',
    '牛转新运', '奋牛蹄春', '牛羊满圈', '牛年鸿运', '牛转新机',
    '牛年如意', '牛财旺盛', '牛福永恒', '牛股相随', '牛运无边',
    '强壮如牛', '平安就牛', '财气真牛', '业绩倍牛', '运势超牛',
    '惊喜福牛', '牛劲十足'
];
let words = [];

let randomWord = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};

let used = new Map();
let lot = function (key, word) {
    words.push(word);
    if (!used.has(key)) {
        let bonus = (Math.abs(Math.sin((key + word).hashCode() + Date.now() * Math.random())) * baseByDays(key)).toFixed(2);
        if (bonus > 0) {
            used.set(key, bonus);
            console.debug(new Date());
            console.debug(used);
            return '【演示文字】恭喜您获得 ' + bonus + ' 元红包！祝您 2021 年' + randomWord(goodWords) + '!';
        }
    }
    return '【演示文字】每人仅一次机会。祝您 2021 年' + randomWord(words) + '!【此消息内容为从大家的抽奖口令中随机生成，若出现一些奇奇怪怪的词语，切莫当真】';
};

var onReq = function(req, res) {
    res.statusCode = 200;
    console.log('Received %s request %s with header %s', req.method, req.url, JSON.stringify(req.headers));
    if (req.method === 'GET' || req.method === 'DELETE') {
        var query = parseUrl(req).query;
        console.log('With query %j', query);
        if (query.echostr) {
            res.write(query.echostr);
            res.end();
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(query));
            res.end();
        }
    } else if (req.method === 'POST' || req.method === 'PUT') {
        parsePostData(req, res, function(req, res, data) {
            console.log('with data %j', data);
            xml2js.parseString(data, function (err, result) {
                if (result && result.xml && result.xml.MsgType && result.xml.MsgType[0] === 'text') {
                    var content = result.xml.Content[0];
                    if (content.toLowerCase() === 'hn') {
                        var resContent = '';
                        https.get('https://news.ycombinator.com/rss', {rejectUnauthorized: false},(rssRes) => {
                            const { statusCode } = rssRes;
                            if (statusCode !== 200) {
                                console.error(statusCode);
                                resContent = 'ERROR';
                            }
                            let rawData = '';
                            rssRes.on('data', (chunk) => { rawData += chunk; });
                            rssRes.on('end', () => {
                                try {
                                    xml2js.parseString(rawData, function (error, rss) {
                                        resContent += 'Top 10 Hacker News';
                                        for (let i = 0; i < 10; i++) {
                                            let item = rss.rss.channel[0].item[i];
                                            resContent += '\r\n\r\n' + item.title;
                                            resContent += '\r\n' + item.link;
                                        }
                                        console.debug(resContent);
                                        res.setHeader('Content-Type', req.headers['content-type']);
                                        res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], resContent));
                                        res.end();
                                    });
                                } catch (e) {
                                    console.error(e.message);
                                }
                            });
                        });
                    } else if (content.length === 4 && content.indexOf('牛') > -1) {
                        res.setHeader('Content-Type', req.headers['content-type']);
                        res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], lot(result.xml.FromUserName[0], content)));
                        res.end();
                    } else {
                        res.setHeader('Content-Type', req.headers['content-type']);
                        res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], content + ", you said."));
                        res.end();
                    }
                } else if (result && result.xml && result.xml.MsgType && result.xml.MsgType[0] === 'event') {
                    let welcome = "欢迎关注 AlphaHinex !\r\n";
                    welcome += "本公众号为 IT 技术主题公众号。\r\n";
                    welcome += "自动回复内容包括：\r\n";
                    welcome += "1. 关注时回复欢迎消息\r\n";
                    welcome += "2. 回声功能：对任何发送给公众号的文本消息，回复 “<发送内容>, you said.”；其他类型的消息回复 “Not support yet.”\r\n";
                    welcome += "3. 十大 Hacker News：发送 hn 关键字，不区分大小写，回复当时 Hacker News RSS 中的前十条内容\r\n";
                    welcome += "4. 抽奖：发送带“牛”字的四字消息，抽取随机金额支付宝口令红包。大年初三（2月14日）正式开启，敬请关注。";
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

var parseUrl = function(req) {
    return url.parse(req.url, true);
};

var parsePostData = function(req, res, callback) {
    var postData = '';
    req.addListener('data', function(chunk) {
        postData += chunk;
    });
    req.addListener('end', function() {
        var data = postData;
        try {
            data = JSON.parse(postData);
        } catch(err) { }
        callback(req, res, data);
    });
};

var builder = new xml2js.Builder({headless: true, cdata: true, renderOpts: {pretty: false}});
var buildTextMsg = function (from, to, content) {
    var obj = {xml: {
            ToUserName: to,
            FromUserName: from,
            CreateTime: new Date().getTime(),
            MsgType: 'text',
            Content: content
        }};
    var resp = builder.buildObject(obj);
    console.debug("Response with %j", resp);
    return resp;
};

http.createServer(onReq).listen(8080);
