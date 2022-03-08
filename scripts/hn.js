'use strict';

const https = require('https');
const xml2js = require('xml2js');
const util = require('./util');
const handler = module.exports = {};

handler.response = (msg) => {
    let resContent = '';
    https.get('https://news.ycombinator.com/rss', {rejectUnauthorized: false}, (rssRes) => {
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
                    resContent += '## Top 10 Hacker News\n\n';
                    for (let i = 0; i < 10; i++) {
                        let item = rss.rss.channel[0].item[i];
                        resContent += '1. [' + item.title + '](' + item.link + ')\n';
                    }
                    handler.envelop(resContent.trim());
                    util.dingtalk(resContent.trim(), 'Top 10 Hacker News');
                });
            } catch (e) {
                console.error(e.message);
            }
        });
    });
};
