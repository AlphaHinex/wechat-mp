'use strict';

const handler = module.exports = {};
const util = require('./util');

handler.response = (msg) => {
    if (msg.startsWith('钉钉')) {
        util.dingtalk(msg.substr(3));
        handler.envelop(util.dingtalkMsg);
    }
};
