'use strict';

const util = require('./util');
const https = require('https');

const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.startsWith('qr ')) {
        const url = "https://chart.googleapis.com/chart?chs=178x178&cht=qr&chl=" + encodeURIComponent(msg.substr(3));
        util.getAccessToken().then((token) => {
            console.debug('Token: ' + token);
            util.fetch(url).then((data) => {
                const addUrl = 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=' + token;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Length': data.length
                    }
                };
                const req = https.request(addUrl, options, (res) => {
                    console.log(`STATUS: ${res.statusCode}`);
                    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                    let addRes = ''
                    res.on('data', (buf) => addRes += buf.toString());
                    res.on('end', () => {
                        console.debug(`add res: ${addRes}`);
                        const json = JSON.parse(addRes.toString());
                        console.debug("Add media response: " + json);
                    });
                });

                req.on('error', (e) => {
                    console.error(`problem with request: ${e.message}`);
                });

                req.write(data);
                req.end();
            });
        });
    }
    console.debug('before');
    console.debug('result: ' + util.token);
    console.debug('after');
    // TODO
    handler.envelop('http://bishun.shufaji.com/datafile/zd/bs/');
};
