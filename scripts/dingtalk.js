'use strict';

const handler = module.exports = {};
const util = require('./util');

handler.response = (msg) => {
    if (msg.startsWith('钉钉')) {
        util.dingtalk(msg.substr(3), function (response) {
            if (response.status === 200) {
                handler.envelop('发送钉钉成功！');
            } else {
                handler.envelop('发送钉钉失败！');
                console.debug(response);
            }
        });
    }
};
