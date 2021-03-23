'use strict';

const handler = module.exports = {};
const util = require('./util');

handler.response = (msg) => {
    if (msg.toLowerCase().startsWith('double ')) {
        handler.envelop(util.getPrecision(msg.substr(7), {mode:'double'}));
    }
};