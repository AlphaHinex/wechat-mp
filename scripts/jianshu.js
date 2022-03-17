'use strict';

const handler = module.exports = {};
const util = require('./util');
const axios = require('axios').default;
const https = require('https');
const { parse } = require('node-html-parser');
const fs = require('fs');

let reportByUser = function(uid) {
    let userDB = [];
    let userMap = new Map();
    let init = true;
    let total = 0, totalRead = 0, totalInc = 0;
    if (fs.existsSync('./' + uid)) {
        init = false;
        userMap = new Map(JSON.parse(fs.readFileSync('./' + uid, 'utf-8')));
    }

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
                        const title = post.querySelector('a.title').text.trim();
                        const readCount = parseInt(post.querySelector('div.meta>a').text.trim());
                        const daysMargin = Math.round((new Date().getTime()
                                - Date.parse(post.querySelector('.time').getAttribute('data-shared-at')))
                                / 1000 / 60 / 60 / 24);
                        const readAvg = (readCount / daysMargin).toFixed(4);
                        const increased = init ? 0 : (readCount - userMap.get(postId));

                        total ++;
                        totalRead += readCount;
                        totalInc += increased;

                        userDB.push({
                            postId: postId,
                            title: title,
                            readCount: readCount,
                            increased: increased,
                            readAvg: readAvg,
                            daysMargin: daysMargin
                        });
                        userMap.set(postId, readCount);
                    });
                    console.debug('Page ' + i + ' completed, parepare to load page ' + (i+1) );
                    postsByPage(++i);
                } else {
                    console.debug('User ' + uid + ' has ' + i + ' pages posts.');
                    let msg = '## [简书阅读量报告](https://www.jianshu.com/u/' + uid + ')\n\n';
                    if (!init) {
                        msg += '阅读量增加：' + totalInc + '\n\n';
                    }
                    msg += '总文章数：' + total + '\n\n总阅读量：' + totalRead + '\n\n';

                    msg += '---\n\n';
                    msg += '### 总量\n\n#### Top 10\n\n';
                    userDB.sort(sortByKey('readCount')).slice(0, 10).forEach( t => {
                        msg += '1. [' + t.title + '](https://www.jianshu.com' + t.postId + ')';
                        msg += ' ' + t.readCount + ' ( ' + ((t.readCount/totalRead)*100).toFixed(2) + '%' +
                            (t.increased > 0 ? '，↑ ' + t.increased : '') + ')\n';
                    });
                    msg += '\n#### Bottom 5\n\n';
                    userDB.sort(sortByKey('readCount', false)).slice(0, 5).forEach( t => {
                        msg += '1. [' + t.title + '](https://www.jianshu.com' + t.postId + ')';
                        msg += ' ' + t.readCount + (t.increased > 0 ? ' ( ↑ ' + t.increased + ')' : '') + '\n';
                    });

                    msg += '---\n\n';
                    msg += '### 阅读量日均增速\n\n#### Top 10\n\n';
                    userDB.sort(sortByKey('readAvg')).slice(0, 10).forEach( t => {
                        msg += '1. [' + t.title + '](https://www.jianshu.com' + t.postId + ') ';
                        msg += t.readAvg + ' ( ' + t.readCount + ' / ' + t.daysMargin + ' )\n';
                    });
                    msg += '\n#### Bottom 5\n\n';
                    userDB.sort(sortByKey('readAvg', false)).slice(0, 5).forEach( t => {
                        msg += '1. [' + t.title + '](https://www.jianshu.com' + t.postId + ') ';
                        msg += t.readAvg + ' ( ' + t.readCount + ' / ' + t.daysMargin + ' )\n';
                    });

                    if (!init) {
                        msg += '---\n\n';
                        msg += '### 增长明细\n\n';
                        let orderByInc = userDB.sort(sortByKey('increased'));
                        orderByInc.forEach(t => {
                            if (t.increased > 0) {
                                msg += '1. [' + t.title + '](https://www.jianshu.com' + t.postId + ')';
                                msg += ' ↑ ' + t.increased + ' => ' + t.readCount + '\n';
                            }
                        });
                    }
                    doubleMsg(msg.trim());
                    fs.writeFileSync('./' + uid, JSON.stringify([...userMap]));
                }
            } else {
                console.debug('Request ' + this.url + 'error with status: ' + response.status);
            }
        }).catch(function (error) {
            console.error(error);
            postsByPage(i);
        });
    };

    postsByPage(1);
};

let sortByKey = (key, desc) => {
    return function (a,b) {
        return desc === false ? a[key] - b[key] : b[key] - a[key];
    }
};

let doubleMsg = function(msg) {
    console.info(msg);
    util.dingtalk(msg, '简书阅读量报告');
};

handler.response = (msg) => {
    if (msg.startsWith('简书')) {
        let uid = msg.substr(3).trim();
        if (uid.length === 0) {
            uid = '618c59928f3b';
        }
        reportByUser(uid);
        handler.envelop(util.dingtalkMsg);
    }
};
