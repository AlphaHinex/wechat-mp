'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    return msg + ', you said.';
};