'use strict';

const axios = require('axios').default;

const token = '792235065'
const cookie = 'appmsglist_action_3208147898=card; ua_id=q03RzogCTZixWUvhAAAAAA3O_hLGf8hh8ZRLnDNEywU=; mm_lang=zh_CN; pgv_pvid=7235700328; ts_uid=7145228605; ptcz=6fb266bb5bf1aec0631768015c1f9d2de4b3558911b997b4b52d1cb72ef3308e; _qimei_q36=; _qimei_h38=c613c18efbd4b7839bbe3c940300000da17a1e; RK=T9UsOUI/9V; _qimei_uuid42=1921209330a1002d3d09678a9c2db97491a06e242d; omgid=0_5ddfe1hFrJ1xR; wxuin=68647115296392; pac_uid=0_20bkhkPQ1m0bJ; _qimei_fingerprint=c67fa471a99bc2dfc3bf60a76ff29daf; ptui_loginuin=3772436168; __root_domain_v=.weixin.qq.com; _qddaz=QD.109645282144077; rand_info=CAESIMkOqtOxNwelY/cMw2WD1XWplL//mTFuvJE9yJPMBvAi; slave_bizuin=3208147898; data_bizuin=3208147898; bizuin=3208147898; data_ticket=GV5wS1OtpdPnDlkiX/so62aZynahrUTnQcddQGZ7lmVlzu0S01fEHpwj3azcPWAa; slave_sid=bDV4RVNKdDNJenMxdXk0aElIZzNDdzFJdWlkX0N3TUJqQ1ladFdsZG92aUVlbU0xRHpGNXVZaXB2YUhqQnlhNGZ3Mko0dlpUa3BvbjBfSWdWNWFiS19sRzAxVDQ0cnZUUm5PRlZRYnkxcmJPaEFFU2VQVGwwb003NFNaMGFYelpmSjVid25HVGtqcHFHbEFt; slave_user=gh_cde907c120da; xid=6e7b5c8f5c75f5bb923c021a2fca7d78; _clck=3208147898|1|g3o|0; _clsk=17n57pt|1771378655924|5|1|mp.weixin.qq.com/weheat-agent/payload/record';

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
                console.debug('followers.set(\'' + lastUser + '\', new Date(' + (date.getYear() + 1900) + ', ' + date.getMonth() + ', ' + date.getDate() + '));');
                step = (new Date(2026, 1, 19, 24).getTime() - date) / 1000 / 60 / 60 / 24 / 600;
                step = (Math.abs(Math.sin(Date.now() * Math.random()) * Math.random()) * step);
                sum += step;
                // console.debug(user.user_name + ',' + user.user_openid + ',' + step.toFixed(2));
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
    new Date(2026, 1, 19, 24).getTime()/1000);
