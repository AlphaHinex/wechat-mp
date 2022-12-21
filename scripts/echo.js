'use strict';

const handler = module.exports = {};
// const axios = require("axios");

handler.response = (msg) => {
    handler.envelop(msg + ', you said.');

    // axios({
    //     url: 'http://172.31.4.79:30880',
    //     params: {
    //         param: msg
    //     }
    // }).then(function (response) {
    //     if (response.status === 200) {
    //         handler.envelop(response.data);
    //     } else {
    //         console.debug(response);
    //     }
    // });

};
