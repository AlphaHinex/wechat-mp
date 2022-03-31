'use strict';

const axios = require("axios");
const handler = module.exports = {};

handler.response = (msg) => {
    const blankLineNum = msg.startsWith('字帖1 ') ? 1 : 0;

    const data = 'raw%5BAttribute%5D%5BLatticeSize%5D=10' +
        '&raw%5BAttribute%5D%5BFontID%5D=id1' +
        '&raw%5BAttribute%5D%5BLatticeColor%5D=3' +
        '&raw%5BAttribute%5D%5Bdivtransparent%5D=20' +
        '&raw%5BAttribute%5D%5Btitle%5D=' +
        '&raw%5BAttribute%5D%5BLatticeType%5D=tzg' +
        '&raw%5BAttribute%5D%5BTransparency%5D=20' +
        '&raw%5BAttribute%5D%5BBlankLineNum%5D=' + blankLineNum +
        '&raw%5BAttribute%5D%5BCopybookType%5D=4' +
        '&raw%5BAttribute%5D%5Bisvip%5D=0' +
        '&raw%5BContent%5D%5B0%5D%5BWord%5D=' +
        encodeURIComponent(msg.substr(msg.indexOf(' ') + 1).replace(/[，。《》——·“”、（）\[\]【】]/g, '')) +
        '&copybookType=4';

    axios({
        url: 'https://tools.yunzitie.cn/api/copybook/createsheet',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        method: 'POST',
        data: data
    }).then(function (response) {
        if (response.status === 200) {
            handler.envelop(response.data.data.Info);
        } else {
            console.debug(response);
        }
    });
};
