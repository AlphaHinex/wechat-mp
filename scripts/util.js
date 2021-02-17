'use strict';

const https = require('https');

const util = module.exports = {};

const APPID = process.env.APPID;
const APPSECRET = process.env.APPSECRET;

let token = '';
let expireAt = 0;

util.fetch = (url) => new Promise((resolve, reject) => {
    https.get(url, {rejectUnauthorized: false}, (res) => {
        let data = Buffer.alloc(0);
        res.on('end', () => resolve(data));
        res.on('data', (buf) => data += buf);
    }).on('error', e => reject(e));
});

util.getAccessToken = () => new Promise((resolve, reject) => {
    if (token && Date.now() < expireAt) {
        resolve(token);
    }
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;
    util.fetch(url).then((rawData) => {
        try {
            const json = JSON.parse(rawData.toString());
            console.debug(json);
            token = json.access_token;
            expireAt = Date.now() + json.expires_in * 1000;
            resolve(token);
        } catch (e) {
            console.error(e.message);
        }
    })
});