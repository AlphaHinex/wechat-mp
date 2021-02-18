'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.startsWith('unicode encode ')) {
        handler.envelop(escape(msg.substr(15)));
    } else if (msg.startsWith('unicode decode ')) {
        handler.envelop(unescape('%u' + msg.substr(15)));
    } else if (msg.startsWith('unicode')) {
        handler.envelop('Usage: "unicode encode xxxx" or "unicode decode xxxx"');
    }
};
