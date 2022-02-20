'use strict';

const googleIt = require('google-it');
const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.startsWith('g ') || msg.startsWith('G ')) {
        googleIt({
            query: msg.substr(2),
            options: {
                url: 'https://www.google.com/search',
                qs: {
                    q: msg.substr(2),
                    num: 5,
                    start: 0,
                    lr: 'lang_cn'
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:34.0) Gecko/20100101 Firefox/34.0'
                }
            },
            'disableConsole': true
        }).then(results => {
            // access to results object here
            let res = 'Search results:';
            results.forEach(result => {
                res += '\r\n\r\n' + result.title;
                res += '\r\n' + result.link;
            });
            handler.envelop(res);
        }).catch(e => {
            console.error(e);
            // any possible errors that might have occurred (like no Internet connection)
        });
    }
};
