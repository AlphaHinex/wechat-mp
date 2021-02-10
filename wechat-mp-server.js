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

const followers = new Map();

followers.set('ounM4v-o9BjWdvY82dyoSAmdBdCQ', new Date(2020, 0, 5));
followers.set('ounM4vxEnoc2MWk8wr9rAUuMT8vg', new Date(2020, 0, 5));
followers.set('ounM4v0P9TW-Yur62iTNU2mTcmho', new Date(2020, 0, 5));
followers.set('ounM4v94lV38ZlOHdkY6fchtObWE', new Date(2020, 0, 5));
followers.set('ounM4v2snOZPVJOgTYOG3zBYeG18', new Date(2020, 0, 5));
followers.set('ounM4vxZtZwrM36IXLv5EaPwTqh8', new Date(2020, 0, 5));
followers.set('ounM4v0avlYzbbz0ziGZFXR5-V4g', new Date(2020, 0, 6));
followers.set('ounM4v8JipwUdchq-2yCESIhzKsM', new Date(2020, 0, 8));
followers.set('ounM4vwWB-mIDDbINZpDSfePB9U4', new Date(2020, 0, 9));
followers.set('ounM4v8rOwhEDWkKgBWdo4Goztfc', new Date(2020, 0, 10));
followers.set('ounM4vy2JbuThgDZRXqrvMGiBRe4', new Date(2020, 0, 16));
followers.set('ounM4vz23fybLtG3HIN5CDSLOLLE', new Date(2020, 1, 19));
followers.set('ounM4vwYO6A5bLVDN0ISpS4AjOD4', new Date(2020, 2, 3));
followers.set('ounM4v7otDTyUB8zYgcPu7v49c0w', new Date(2020, 2, 5));
followers.set('ounM4v7gtPF7Yb6iUN1RPeLeEVF0', new Date(2020, 2, 6));

followers.set('ounM4v4HNpshPV70MwRoGx_OPU5s', new Date(2020, 3, 3));
followers.set('ounM4vyBh8udSS1Zo7WSlgqTGbBs', new Date(2020, 3, 17));
followers.set('ounM4v_fWQqA2E7_6Ywmv6m0RHfQ', new Date(2020, 3, 17));
followers.set('ounM4v82NLx2udB_86j9RakG77LQ', new Date(2020, 3, 17));
followers.set('ounM4v4ROMb5nx92jUFtBXrGUIa0', new Date(2020, 5, 1));
followers.set('ounM4vw50WtnaCIf0ZlDhSa2buo0', new Date(2020, 5, 23));
followers.set('ounM4v9Tmck3MizjVvE3IMRh0RGk', new Date(2020, 5, 27));
followers.set('ounM4v3wicrVN1W1UIfT3wurei80', new Date(2020, 5, 27));
followers.set('ounM4v7T7f0VFDd8LwpWosNEQQMA', new Date(2020, 5, 27));
followers.set('ounM4v9CUjIHDTDOwDSbv1OCpFO4', new Date(2020, 5, 27));
followers.set('ounM4v7M6Tu43m9rt33IVYONWG9o', new Date(2020, 6, 19));
followers.set('ounM4v7x9Wtme_3L3DL7j9pfLbZc', new Date(2020, 6, 30));
followers.set('ounM4v6EKIAac2Ms40clVlm52D4o', new Date(2020, 7, 2));
followers.set('ounM4v_YzJudIyTabo41bzbyzzPc', new Date(2020, 7, 2));
followers.set('ounM4v97geqvfACI7ulRgBUumi_U', new Date(2020, 7, 2));
followers.set('ounM4v3OFOjBPbZh2xJ6m-nzHRKk', new Date(2020, 7, 2));
followers.set('ounM4v16RMZXeNBTZIUPiMs2Fse0', new Date(2020, 7, 2));
followers.set('ounM4v74GpiExtKFrlFMfWOnnBgo', new Date(2020, 7, 2));
followers.set('ounM4v_BzKO8o84Newv51vadZ9U8', new Date(2020, 7, 2));
followers.set('ounM4v-zoDms3lNsH-8bl53nrxl8', new Date(2020, 7, 18));

followers.set('ounM4v4CJb2_ZyE4KD1zr8F4mBmQ', new Date(2020, 8, 20));
followers.set('ounM4v8wvceJRv4z7VssfOF4zfko', new Date(2020, 8, 20));
followers.set('ounM4v32tfkw9WeXHZh6UhaNtGF8', new Date(2020, 10, 8));
followers.set('ounM4vykM2vjEnMduuXJpPoNtNYE', new Date(2020, 10, 8));
followers.set('ounM4v7z45mhMnSdhQd3_5MtsnEM', new Date(2020, 10, 8));
followers.set('ounM4vw73MkNkV9L4bXDZnWiSmPU', new Date(2020, 10, 8));
followers.set('ounM4v_5EMGxwoNREk1K20_U4ufs', new Date(2020, 10, 8));
followers.set('ounM4v8yuuSTyRhlI4psZeNfO-oQ', new Date(2020, 10, 8));
followers.set('ounM4v8txk5dS_vu3Wmxk4pzednk', new Date(2020, 10, 8));
followers.set('ounM4v_icZRUR6EbG6t2m64rhvYQ', new Date(2020, 10, 15));
followers.set('ounM4v4wwKHi_4LSQdgmqEEGDrgY', new Date(2020, 10, 20));
followers.set('ounM4v2EjduO_o6KsmWfimyHzQ50', new Date(2020, 11, 6));
followers.set('ounM4v4REXq9xGd-jea63jMSow2Y', new Date(2020, 11, 27));
followers.set('ounM4v8LnKmJJqdng9ofoBqVy1Xc', new Date(2021, 0, 3));
followers.set('ounM4vzP4tZP3oUXevp-VlO28vQY', new Date(2021, 0, 3));
followers.set('ounM4v4cFotgDyF5hC9fZXT1l9As', new Date(2021, 0, 24));
followers.set('ounM4vwJBBzXrX1EsYTxKt7uWle8', new Date(2021, 0, 25));
followers.set('ounM4v5sDYDSAaXvuyxchfNYfFPY', new Date(2021, 0, 25));
followers.set('ounM4v7dF6suDVlzYiiKnzL6Kprk', new Date(2021, 0, 28));
followers.set('ounM4v0t3mMghc24ZoRaEnXH-pK8', new Date(2021, 0, 31));

let used = new Set();

let baseByDays = function(key) {
    if (followers.has(key)) {
        return (new Date(2021, 1, 14).getTime() - followers.get(key).getTime()) / 1000 / 60 / 60 / 24 / 10;
    } else {
        return 0;
    }
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

let lot = function (key, word) {
    words.push(word);
    console.debug(words);
    // if (!used.has(key)) {
    //     used.add(key);
        let bonus = (Math.abs(Math.sin((key + word).hashCode() + Date.now() * Math.random())) * baseByDays(key)).toFixed(2);
        if (bonus > 0) {
            return '【此消息为演示所用，正式抽奖将在大年初三开启，具体时间取决于几点起床😂，敬请期待】恭喜您获得 ' + bonus + ' 元支付宝口令红包！口令将稍后通过公众号发放，请耐心等候并注意查收。祝您 2021 年' + randomWord(goodWords) + '!';
        }
    // }
    return '祝您 2021 年' + randomWord(words) + '!【此消息内容为从大家的抽奖口令中随机生成，若出现一些奇奇怪怪的词语，切莫当真】';
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
                } else if (result && result.xml && result.xml.MsgType) {
                    res.setHeader('Content-Type', req.headers['content-type']);
                    res.write(buildTextMsg(result.xml.ToUserName[0], result.xml.FromUserName[0], "Not support yet."));
                    res.end();
                } else {
                    res.setHeader('Content-Type', req.headers['content-type']);
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