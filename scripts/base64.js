'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.startsWith('base64 encode ')) {
        handler.envelop(new Buffer(msg.substr(14)).toString('base64'));
    } else if (msg.startsWith('base64 decode ')) {
        handler.envelop(new Buffer(msg.substr(14), 'base64').toString('utf8'));
    } else if (msg.startsWith('base64')) {
        handler.envelop('Usage: "base64 encode xxxx" or "base64 decode xxxx"');
    }
};