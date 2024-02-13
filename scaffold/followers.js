'use strict';

const axios = require('axios').default;

const token = '534920354'
const cookie = 'appmsglist_action_3208147898=card; appmsglist_action_3863882394=card; ua_id=q03RzogCTZixWUvhAAAAAA3O_hLGf8hh8ZRLnDNEywU=; pgv_pvi=7473781760; mm_lang=zh_CN; pgv_pvid=7235700328; tvfe_boss_uuid=f438c11e71b550ca; ts_uid=7145228605; pac_uid=0_42178da8ef179; wxuin=15629552660884; fqm_pvqid=18eb8d63-4e9c-43e1-b480-c4d25ad890a2; RK=7J0s0ZzVVp; ptcz=6fb266bb5bf1aec0631768015c1f9d2de4b3558911b997b4b52d1cb72ef3308e; _qddaz=QD.109645282144077; iip=0; _qimei_q36=; _qimei_h38=c613c18efbd4b7839bbe3c940300000da17a1e; __root_domain_v=.weixin.qq.com; _qimei_fingerprint=7de236812158edd0ee147ccfef07638b; ptui_loginuin=3810210064; poc_sid=HNa5vWWj6FSKj7DSTYxkA7gb6BlHmK6Xku1UUemc; rand_info=CAESINMi85diuZEr6ZecIn4AlGH9/6qncfgWQ5UATdp4YQ99; slave_bizuin=3208147898; data_bizuin=3208147898; bizuin=3208147898; data_ticket=P7og0lwWwES82YPcESvBI3MLfaF71xv2fFJiPZe9rq2vci65FzEtRHsgXd0EQD48; slave_sid=VVowVmxuX1pFOGhuOVB3N18wdjR0WW85RlNGZDEzcFVVQ0xLeVlhN2NSc29SWUx2NW5MWmZVdk1MVDJCZm5hVWQxRnV0aGkxcmpDbTZ6cmJCN1pSNWFKbFA0ME5odlBJa0U3MWpSZjg2V25yT3lFaG9xV2ZrZkRwZnM1czd6N1dTeFZLcW1lSzFrV0p6eEIw; slave_user=gh_cde907c120da; xid=0e54643169b0cfb176a19623a0f293c4; _clck=3208147898|1|fj7|0; _clsk=12jb5tn|1707698417392|4|1|mp.weixin.qq.com/weheat-agent/payload/record';

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
                step = (new Date(2024, 1, 12, 24).getTime() - date) / 1000 / 60 / 60 / 24 / 300;
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
    new Date(2024, 1, 12, 24).getTime()/1000);
