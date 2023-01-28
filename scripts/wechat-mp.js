'use strict';

const handler = module.exports = {};
const util = require('./util');
const exec = require('child_process').exec;
const DINGTALK_TOKEN = process.env.DINGTALK_TOKEN;

handler.response = (msg) => {
    if (msg.startsWith('公众号 ')) {
        console.log(msg.substr(4));
        const cmdStr = '/home/ec2-user/wechat-mp-cli/wechat-mp_linux_amd64 ' +
            '--cookie-file /home/ec2-user/wechat-mp-cli/gh_cde907c120da.cookie ' +
            '-o /home/ec2-user/wechat-mp-cli --dingtalk-token ' + DINGTALK_TOKEN;
        exec(cmdStr, function (err, stdout, stderr) {
            if (err) {
                console.log(stderr);
            } else {
                console.log(stdout);
            }
        });
        handler.envelop(util.dingtalkMsg);
    }
};
