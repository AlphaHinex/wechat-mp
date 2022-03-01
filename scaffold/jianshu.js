'use strict';

const axios = require('axios').default;
const https = require('https');
const { parse } = require('node-html-parser');
const fs = require('fs');

// const uid = 'd682f8cbe064'
const uid = '618c59928f3b'

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
                    if (userMap.has(postId) && readCount > userMap.get(postId) ) {
                        msg += title + ' ↑ ' + (readCount - userMap.get(postId) + ' => ' + readCount) + '\r\n';
                        msg += 'https://www.jianshu.com' + postId + '\r\n\r\n';
                    }
                    userMap.set(postId, readCount);
                });
                console.debug('Page ' + i + ' completed, parepare to load page ' + (i+1) );
                postsByPage(++i);
            } else {
                console.debug('User ' + uid + ' has ' + i + ' pages posts.');
                if (init) {
                    console.info('User ' + uid + '\'s profile initialized!');
                } else if (msg > '') {
                    console.info(msg);
                } else {
                    console.info('Nothing changed during these times.');
                }
                fs.writeFileSync('./' + uid, JSON.stringify([...userMap]));
            }
        } else {
            console.debug('Request ' + this.url + 'error with status: ' + response.status);
        }
    });
};

postsByPage(1);
