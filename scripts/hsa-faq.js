'use strict';

const handler = module.exports = {};
const io = require('../io');

handler.response = (msg) => {
    if (msg.startsWith('hsa-faq ')) {
        io.server.emit('hsa-faq', msg.substr(8));
        handler.envelop('请加入钉钉群（34796091）接收消息！');
    }
};
