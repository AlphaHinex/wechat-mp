'use strict';

const util = require('./util');
const FormData = require('form-data');
const https = require('https');

const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.startsWith('qr ')) {
        util.getAccessToken().then((token) => {
            console.debug('Token: ' + token);
            const url = "https://chart.googleapis.com/chart?chs=178x178&cht=qr&chl=" + encodeURIComponent(msg.substr(3));
            https.get(url, {rejectUnauthorized: false}, function(response) {
                console.debug(`Request ${url}`);
                let form = new FormData();
                form.append('media', response, {
                    filename: 'test.jpg',
                    contentType: 'image/jpeg'
                });
                form.append('access_token', token);
                form.append('type', 'image');
                const addUrl = 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=' + token + '&type=image';
                form.submit(addUrl, function(err, res) {
                    // res – response object (http.IncomingMessage)  //
                    console.log(`add url: ${addUrl}`);
                    console.log(`STATUS: ${res.statusCode}`);
                    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
                    let addRes = ''
                    res.on('data', (buf) => addRes += buf.toString());
                    res.on('end', () => {
                        console.debug(`add res: ${addRes}`);
                        const json = JSON.parse(addRes.toString());
                        try {
                            const postData = JSON.stringify({
                                'media_id': json.media_id,
                                'access_token': token
                            });
                            const options = {
                                hostname: 'api.weixin.qq.com',
                                path: '/cgi-bin/material/del_material?access_token=' + token,
                                method: 'POST',
                                rejectUnauthorized: false
                            };
                            const delUrl = 'https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=' + token;
                            const req = https.request(options, (delResp) => {
                                console.log(`STATUS: ${delResp.statusCode}`);
                                console.log(`HEADERS: ${JSON.stringify(delResp.headers)}`);
                                let delRes = '';
                                delResp.on('data', (buf) => delRes += buf.toString());
                                delResp.on('end', () => {
                                    console.debug(`del res: ${delRes}`);
                                });
                            });
                            // Write data to request body
                            req.write(postData);
                            req.end();

                            handler.envelop(json.media_id, 'image');
                        } catch (e) {
                            console.error(e);
                        }
                    });
                });
            });
        });
    }
};
