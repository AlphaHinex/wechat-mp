'use strict';

const axios = require('axios').default;
const https = require('https');
const { parse } = require('node-html-parser');
const fs = require('fs');

const uid = '618c59928f3b'
// const cookie = '_ga=GA1.2.1115733705.1589360509; __gads=ID=a6fb09614253225e-223ca284d3c200fa:T=1596897208:RT=1596897208:S=ALNI_MZsQfaxtGkBwdz49rJ1MZsN3Ki7ug; __yadk_uid=UoujYMYwcpFTwCZ9BY8bva2WwCgMhNhq; UM_distinctid=17c444516455e8-05837ca64ac82b-1c3b6650-13c680-17c4445164687f; remember_user_token=W1syMDc4NTQ4OV0sIiQyYSQxMSRTLllBZzVtSWhCcngvVFAvZHV4a29lIiwiMTY0NjAxNzUwNC44NTE5NjExIl0%3D--22d43f47ea13cbd686823ddb7386d3757b465341; read_mode=day; default_font=font2; locale=zh-CN; _m7e_session_core=f4f1c611c016f120918c11dad637f9e7; Hm_lvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1645672397,1645755696,1645765873,1646017506; _gid=GA1.2.1725718647.1646031373; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2220785489%22%2C%22%24device_id%22%3A%22171f3db6cea62-03691d0440e9ce-30647d06-2073600-171f3db6cec9cf%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_utm_source%22%3A%22desktop%22%2C%22%24latest_utm_medium%22%3A%22timeline%22%2C%22%24latest_utm_campaign%22%3A%22hugo%22%2C%22%24latest_utm_content%22%3A%22note%22%7D%2C%22first_id%22%3A%22171f3db6cea62-03691d0440e9ce-30647d06-2073600-171f3db6cec9cf%22%7D; Hm_lpvt_0c0e9d9b1e7d617b3e6842e85b9fb068=1646038107; CNZZDATA1279807957=666716699-1617461250-https%253A%252F%252Fcn.bing.com%252F%7C1646035306';

let userMap;
fs.readFile('./' + uid, 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    userMap = new Map(JSON.parse(data));
});

let msg = '';
let postsByPage = function(i) {
    axios({
        url: 'https://www.jianshu.com/u/' + uid + '?order_by=shared_at&page=' + i,
        headers: {
            // 'cookie': cookie,
            'X-INFINITESCROLL': true
        },
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    }).then(function (response) {
        if (response.status === 200) {
            if (response.data.trim() > '') {
                const dom = parse(response.data);
                dom.querySelectorAll('div.content').forEach((post) => {
                    const postId = post.querySelector('a.title').getAttribute('href').trim();
                    const readCount = parseInt(post.querySelector('div.meta>a').text.trim());
                    const title = post.querySelector('a.title').text.trim();
                    if (userMap.has(postId) && readCount > userMap.get(postId) ) {
                        msg += title + ' ↑ ' + (readCount - userMap.get(postId) + ' => ' + readCount) + '\r\n';
                    }
                    userMap.set(postId, readCount);
                });
                postsByPage(++i);
            } else {
                console.debug(msg);
                fs.writeFile('./' + uid, JSON.stringify([...userMap]), err => {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        } else {
            console.debug(response.status);
        }
    });
};

postsByPage(1);
