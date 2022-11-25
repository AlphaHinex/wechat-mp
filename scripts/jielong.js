'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    const lines = msg.split('\n');
    let result = '';
    const map = new Map();
    lines.forEach(line => {
        if (/^\d{1,3}.*$/.test(line)) {
            let newLine = line.substr(line.indexOf('.') + 2);
            const key = newLine.match(/^\d*/)[0];
            if (/^\d{1,3}/.test(key)) {
                map.set(key, newLine);
            }
        } else {
            result += line + '\n';
        }
    });
    const toSort = [];
    for (const key of map.keys()) {
        toSort.push(key);
    }
    toSort.sort((a, b) => {
        return parseInt(a) - parseInt(b);
    });

    let i = 1;
    toSort.forEach(key => {
        result += i++ + '. ' + map.get(key) + '\n';
    });
    handler.envelop(result);
};
