'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    const unicode = escape(msg);
    const len = unicode.length;
    const lastChar = unicode.charAt(len - 1);
    handler.envelop('http://bishun.shufaji.com/datafile/zd/bs/' + lastChar + '/' + unicode.substr(2) + '.gif');
};
