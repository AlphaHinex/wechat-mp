'use strict';

const handler = module.exports = {};
const io = require('../io');

handler.response = (msg) => {
    if (msg.startsWith('hsa-faq ')) {
        io.server.emit('hsa-faq', msg.substr(8));
        handler.envelop('请加入飞书群 HSA FAQ（https://www.feishu.cn/download?share_chat_token=be9jbc24-0998-4b86-b872-3d2baeb06007）接收消息！');
    }
};
