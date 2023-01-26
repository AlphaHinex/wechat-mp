'use strict';

const axios = require('axios').default;

const token = '451063539'
const cookie = 'appmsglist_action_3208147898=card; appmsglist_action_3863882394=card; noticeLoginFlag=1; ua_id=q03RzogCTZixWUvhAAAAAA3O_hLGf8hh8ZRLnDNEywU=; pgv_pvi=7473781760; mm_lang=zh_CN; pgv_pvid=7235700328; tvfe_boss_uuid=f438c11e71b550ca; ts_uid=7145228605; pac_uid=0_42178da8ef179; wxuin=15629552660884; personAgree_3208147898=true; fqm_pvqid=18eb8d63-4e9c-43e1-b480-c4d25ad890a2; RK=7J0s0ZzVVp; ptcz=6fb266bb5bf1aec0631768015c1f9d2de4b3558911b997b4b52d1cb72ef3308e; LW_uid=J126g4c3t7o6w5O155n1k6r9F1; __root_domain_v=.weixin.qq.com; _qddaz=QD.109645282144077; eas_sid=q146N6C1D0v4x853Y2W5K166q1; ptui_loginuin=1628406477; LW_sid=7106U7P3q608x1q4N4d9G6Y9O1; uuid=fb517bda649b84123aad143d83437187; rand_info=CAESILPvkcC64DFgizRn4WPUvlrxRdCTucgIXCSVjikqBESH; slave_bizuin=3208147898; data_bizuin=3208147898; bizuin=3208147898; data_ticket=aoLaYEibOCMwcz91nq7cOIKR7G6Twujvh2DrT2SPZmyDorEkANOarRRpeyIpWjCM; slave_sid=aERmY1JKUWJoS2swMGxXcGlKZ1B0d3pRTm9fUThDYkxQcmFJZEZ3d1FHMFE5X2NCZ1l6aEFLU3hVRFAwXzBfdmRCd2g2bkl0aVkzT0V2MmhSOWRKUWtfU2ozd1NTZGFvVUY2aUlyemlJd21GenJmUEJodVlBd2FOeEtCeDFvM1RhSXVqS05DV1NLUEdodFpE; slave_user=gh_cde907c120da; xid=7b6da3190e626bf11372baa106ecc898; _clck=3208147898|1|f8h|0; _clsk=1oawvio|1674391206006|3|1|mp.weixin.qq.com/weheat-agent/payload';

let sum = 0;
let idx = 0;
let followersByPage = function (openid, createTime) {
    axios({
        url: 'https://mp.weixin.qq.com/cgi-bin/user_tag?action=get_user_list&groupid=-2&begin_openid=' + openid + '&begin_create_time=' + createTime + '&limit=20&offset=0&token=' + token,
        headers: {
            'cookie': cookie
        }
    }).then(function (response) {
        if (response.status === 200 && response.data && response.data.user_list && response.data.user_list.user_info_list) {
            let lastUser, lastTime, date, step
            response.data.user_list.user_info_list.forEach((user) => {
                lastUser = user.user_openid
                lastTime = user.user_create_time
                date = new Date(lastTime * 1000)
                // console.debug(user.user_name);
                // console.debug(date);
                ++idx;
                // console.debug('followers.set(\'' + lastUser + '\', new Date(' + (date.getYear() + 1900) + ', ' + date.getMonth() + ', ' + date.getDate() + '));');
                step = (new Date(2023, 0, 24, 18).getTime() - date) / 1000 / 60 / 60 / 24 / 300;
                step = (Math.abs(Math.sin(Date.now() * Math.random()) * Math.random()) * step);
                sum += step;
                console.debug(user.user_name + ',' + user.user_openid + ',' + step.toFixed(2));
                // console.debug(step.toFixed(2));
            });
            if (lastUser !== openid) {
                followersByPage(lastUser, lastTime)
            }
        } else {
            console.debug(response.status);
            console.debug(idx);
            console.debug('sum: ' + sum.toFixed(2));
        }
    });
};

console.debug('username,openid,bouns');
followersByPage('',
    new Date(2023, 0, 24, 18).getTime()/1000);
