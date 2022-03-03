'use strict';

const handler = module.exports = {};
const util = require('./util');
const axios = require('axios').default;
const https = require('https');
const { parse } = require('node-html-parser');
const fs = require('fs');

let reportByUser = function(uid) {
    let userMap = new Map();
    let init = true;
    if (fs.existsSync('./' + uid)) {
        init = false;
        userMap = new Map(JSON.parse(fs.readFileSync('./' + uid, 'utf-8')));
    }

    let msg = '';
    let postsByPage = function(i) {
        axios({
            url: 'https://www.jianshu.com/u/' + uid + '?order_by=shared_at&page=' + i,
            headers: {
                'X-INFINITESCROLL': true
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            })
        }).then(function (response) {
            if (response.status === 200) {
                if (response.data.trim() > '') {
                    const dom = parse(response.data);
                    dom.querySelectorAll('div.content').forEach((post) => {
                        const postId = post.querySelector('a.title').getAttribute('href').trim();
                        const readCount = parseInt(post.querySelector('div.meta>a').text.trim());
                        const title = post.querySelector('a.title').text.trim();
                        if ((userMap.has(postId) && readCount > userMap.get(postId)) || (!init && !userMap.has(postId))) {
                            msg += '[' + title + '](https://www.jianshu.com' + postId + ')\n\n';
                            msg += ' ↑ ' + (readCount - (userMap.get(postId)|0) + ' => ' + readCount) + '\n\n';
                        }
                        userMap.set(postId, readCount);
                    });
                    console.debug('Page ' + i + ' completed, parepare to load page ' + (i+1) );
                    postsByPage(++i);
                } else {
                    console.debug('User ' + uid + ' has ' + i + ' pages posts.');
                    if (init) {
                        doubleMsg('User ' + uid + '\'s profile initialized!');
                    } else if (msg > '') {
                        doubleMsg('## 简书阅读量报告\n\n' + msg.trim());
                    } else {
                        doubleMsg('Nothing changed during these times.');
                    }
                    fs.writeFileSync('./' + uid, JSON.stringify([...userMap]));
                }
            } else {
                console.debug('Request ' + this.url + 'error with status: ' + response.status);
            }
        });
    };

    postsByPage(1);
};

let doubleMsg = function(msg) {
    console.info(msg);
    util.dingtalk(msg, function (response) {
        if (response.status !== 200) {
            console.debug(response);
            msg = '钉钉消息发送失败！\r\n' + msg;
        }
        handler.envelop(msg);
    }, '简书日报');
}

handler.response = (msg) => {
    if (msg.startsWith('简书')) {
        let uid = msg.substr(3).trim();
        if (uid.length === 0) {
            uid = '618c59928f3b';
        }
        reportByUser(uid);
    }
};
