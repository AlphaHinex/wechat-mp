'use strict';

const axios = require("axios");

const API_KEY = process.env.API_KEY;

const handler = module.exports = {};

handler.response = (msg) => {
    axios({
        url: 'https://apis.tianapi.com/saylove/index?key=' + API_KEY
    }).then(function (response) {
        if (response.status === 200) {
            handler.envelop(response.data.result.content);
        } else {
            console.debug(response);
        }
    });
};

