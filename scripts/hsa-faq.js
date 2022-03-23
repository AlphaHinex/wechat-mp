'use strict';

const handler = module.exports = {};
const io = require('../io');
const util = require("./util");

handler.response = (msg) => {
    if (msg.startsWith('hsa-faq ')) {
        io.server.emit('hsa-faq', msg.substr(8));
        handler.envelop(util.dingtalkMsg);
    }
};
