'use strict';

const https = require('https');
const util = module.exports = {};
const APPID = process.env.APPID;
const APPSECRET = process.env.APPSECRET;
let token = '';
let expireAt = 0;

util.getAccessToken = function () {
    if (token && Date.now() < expireAt) {
        return token;
    }
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;
    https.get(url, {rejectUnauthorized: false}, (res) => {
        const { statusCode } = res;
        if (statusCode !== 200) {
            console.error(statusCode);
        }
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const json = JSON.parse(rawData);
                console.debug(json);
                token = json.access_token;
                expireAt = Date.now() + json.expires_in * 1000;
                return token;
            } catch (e) {
                console.error(e.message);
            }
        });
    });
};