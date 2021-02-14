'use strict';

const handler = module.exports = {};

String.prototype.hashCode = function() {
    let hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};

let getSubscribeDate = (key) => {
    return key.hashCode();
};
let baseByDays = function(key) {
    return (Date.now() - getSubscribeDate(key)) / 1000 / 60 / 60 / 24 / 10;
};

const goodWords = [
    '青牛紫气', '牛气冲天', '牛运亨通', '牛势冲盘', '财如牛毛',
    '牛转新运', '奋牛蹄春', '牛羊满圈', '牛年鸿运', '牛转新机',
    '牛年如意', '牛财旺盛', '牛福永恒', '牛股相随', '牛运无边',
    '强壮如牛', '平安就牛', '财气真牛', '业绩倍牛', '运势超牛',
    '惊喜福牛', '牛劲十足'
];
let words = [];

let randomWord = function (array) {
    return array[Math.floor(Math.random() * array.length)];
};

let used = new Map();
let lot = function (key, word) {
    words.push(word);
    if (!used.has(key)) {
        let bonus = (Math.abs(Math.sin((key + word).hashCode() + Date.now() * Math.random())) * baseByDays(key)).toFixed(2);
        if (bonus > 0) {
            used.set(key, bonus);
            console.debug(new Date());
            console.debug(used);
            return '【演示文字】恭喜您获得 ' + bonus + ' 元红包！祝您 2021 年' + randomWord(goodWords) + '!';
        }
    }
    return '【演示文字】每人仅一次机会。祝您 2021 年' + randomWord(words) + '!【此消息内容为从大家的抽奖口令中随机生成，若出现一些奇奇怪怪的词语，切莫当真】';
};

handler.response = (msg, fromUser) => {
    return lot(fromUser, msg);
};