'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    handler.envelop(msg + ', you said.');
};