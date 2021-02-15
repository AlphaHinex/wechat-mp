'use strict';

const googleIt = require('google-it');
const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.startsWith('g ') || msg.startsWith('G ')) {
        googleIt({'query': msg.substr(2)}).then(results => {
            console.debug(results);
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