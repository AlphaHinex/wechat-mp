'use strict';

const googleIt = require('google-it');
const handler = module.exports = {};
const options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
    }
};

handler.response = (msg) => {
    if (msg.startsWith('g ') || msg.startsWith('G ')) {
        googleIt({options, 'query': msg.substr(2), 'disableConsole': true, limit: 5}).then(results => {
            // access to results object here
            let res = 'Search results:';
            results.forEach(result => {
                res += '\r\n\r\n' + result.title;
                res += '\r\n' + result.link;
                res += '\r\n' + result.snippet;
            });
            handler.envelop(res);
        }).catch(e => {
            console.error(e);
            // any possible errors that might have occurred (like no Internet connection)
        });
    }
};
