'use strict';

const https = require('https');
const xml2js = require('xml2js');
const handler = module.exports = {};

handler.response = (msg) => {
    let resContent = '';
    https.get('https://news.ycombinator.com/rss', {rejectUnauthorized: false})
         .then((rssRes) => {
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
                     });
                 } catch (e) {
                     console.error(e.message);
                 }
             });
         }).then(() => {
        return resContent;
    });
};