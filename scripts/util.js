'use strict';

const https = require('https');

const util = module.exports = {};

const APPID = process.env.APPID;
const APPSECRET = process.env.APPSECRET;

let token = '';
let expireAt = 0;

util.fetch = (url) => new Promise((resolve, reject) => {
    https.get(url, {rejectUnauthorized: false}, (res) => {
        let data = Buffer.alloc(0);
        res.on('end', () => resolve(data));
        res.on('data', (buf) => data += buf);
    }).on('error', e => reject(e));
});

util.getAccessToken = () => new Promise((resolve, reject) => {
    console.debug(`util.token: ${token}`);
    console.debug(`util.expireAt: ${expireAt}`);
    if (token && Date.now() < expireAt) {
        resolve(token);
    } else {
        const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + APPSECRET;
        util.fetch(url).then((rawData) => {
            try {
                const json = JSON.parse(rawData.toString());
                console.debug(json);
                token = json.access_token;
                expireAt = Date.now() + json.expires_in * 1000;
                resolve(token);
            } catch (e) {
                console.error(e.message);
            }
        });
    }
});

function createBias(exponent) {
    return Math.pow(2, exponent - 1) - 1;
}

function createSign(value) {
    if (value === 0) {
        value = 1 / value;
    }
    return value ? value < 0 ? 1 : 0 : 0;
}

function createUnsignedBinaryString(value, unsigned) {
    let binary = (value >>> 0).toString(2);
    for (let i = binary.length; i < unsigned; i++) {
        binary = '0' + binary;
    }
    return binary;
}

function createBinaryString(value, bits) {
    let signed = value.length;
    let binary = '';
    if (!signed) {
        throw new Error('Object has no length');
    }
    let unsigned = bits / signed;
    for (let i = 0; i < signed; i++) {
        binary += createUnsignedBinaryString(value[i], unsigned);
    }
    return binary;
}

function createBinaryFromFraction(value, mantissa, startFraction, round) {
    let fraction = '';
    for (let i = 0; i < mantissa; i++) {
        value = value * 2;
        fraction += parseInt((value) >>> 0).toString(2);
        if (value > 1) {
            value = value - 1;
        }
        if (value === startFraction || value === 1) {
            if (round && (fraction[i] === '0' && value > 0.05)) {
                fraction = fraction.slice(0, i - 1);
                fraction += '1';
            }
            for (let j = 0; j < (mantissa - i); j++) {
                fraction += '0';
            }
            break;
        }
        if (i === mantissa - 1) {
            if (round && (fraction[i] === '0' && value > 0.05)) {
                fraction = fraction.slice(0, i);
                fraction += '1';
            }
        }
    }
    return fraction;
}

function createInt(value, bits) {
    let array = [];
    for (let i = 0; i < (value.length / bits); i++) {
        let binary = '';
        for (let j = i * bits; j < ((i + 1) * bits); j++) {
            binary += value[j];
        }
        array.push(parseInt(binary, 2));
    }
    return array;
}

function precisionToDecimal(value, bits, mantissa) {
    let bias = createBias(bits - mantissa - 1);
    let sign = parseInt(value[0], 2);
    let maxExponent = Math.pow(2, (bits - mantissa - 1)) - 1;
    let exponent = '';
    let fraction = 0;
    for (let i = 1; i < (bits - mantissa); i++) {
        exponent += value[i];
    }
    for (let i = (bits - mantissa); i < bits; i++) {
        fraction += parseInt(value[i], 2) * Math.pow(2, (-1 * (i - (bits - mantissa) + 1)));
    }
    exponent = parseInt(exponent, 2);
    if (exponent === 0 && fraction === 0) {
        return Math.pow(-1, sign) * 0.0;
    }
    if (exponent === maxExponent && fraction === 0) {
        return Math.pow(-1, sign) * Infinity;
    }
    if (exponent === maxExponent && fraction !== 0) {
        return NaN;
    }
    if (exponent === 0) {
        return Math.pow(-1, sign) * (fraction) * Math.pow(2, (-1 * (bias - 1)));
    }
    return Math.pow(-1, sign) * (1 + fraction) * Math.pow(2, (exponent - bias));
}

function decimalToPrecision(value, bits, mantissa) {
    if (value === 0) {
        let zeroBinary = createSign(value).toString();
        for (let i = 1; i < bits; i++) {
            zeroBinary += '0';
        }
        return zeroBinary;
    }
    if (value === Infinity || value === -Infinity) {
        let infinityBinary = createSign(value).toString();
        for (let i = 1; i < (bits - mantissa); i++) {
            infinityBinary += '1';
        }
        for (let i = (bits - mantissa); i < bits; i++) {
            infinityBinary += '0';
        }
        return infinityBinary;
    }
    if (isNaN(value)) {
        let nanBinary = '0';
        for (let i = 1; i < bits; i++) {
            nanBinary += '1';
        }
        return nanBinary;
    }
    let isDenormal = false;
    let round = true;
    let sign = createSign(value);
    let bias = createBias(bits - mantissa - 1);
    let minExponent = Math.pow(2, (-1 * (bias - 1)));
    value = Math.pow(-1, sign) * value;
    if (value < 1) {
        let exponent = '';
        if (value < minExponent) {
            isDenormal = true;
            value = value / minExponent;
            exponent = createUnsignedBinaryString(0, bits - mantissa - 1);
        }
        else {
            let counter = 0;
            while (value < 1) {
                counter++;
                let denominator = Math.pow(2, -1 * counter);
                value = ((value / denominator) >= 1 && (value / denominator) < 2) ? (value / denominator) : value;
            }
            exponent = parseInt(-1 * counter + bias);
            exponent = createUnsignedBinaryString(exponent, bits - mantissa - 1);
        }
        let startFraction = value - parseInt(value);
        let currentValue = startFraction;
        if (isDenormal) {
            round = false;
        }
        let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);
        return sign + exponent + fraction;
    }
    else {
        let integer = parseInt((value) >>> 0).toString(2);
        let exponent = parseInt(integer.length - 1 + bias);
        exponent = createUnsignedBinaryString(exponent, bits - mantissa - 1);
        let startFraction = value - parseInt(value);
        let currentValue = startFraction;
        let fraction = createBinaryFromFraction(currentValue, mantissa, startFraction, round);

        fraction = (integer + fraction).slice(1, mantissa + 1);
        return sign + exponent + fraction;
    }
}

util.getDecimal = function getDecimal(value, options) {
    let bits = 32;
    let mantissa = 23;
    if (options && options.mode === 'half') {
        bits = 16;
        mantissa = 10;
    }
    else if (options && options.mode === 'single') {
        bits = 32;
        mantissa = 23;
    }
    else if (options && options.mode === 'double') {
        bits = 64;
        mantissa = 52;
    }
    if (!value.length) {
        throw new Error('Object must have length and be the type of array or string');
    }
    if (typeof value === 'object') {
        try {
            value = createBinaryString(value, bits);
        }
        catch(error) {
            console.log(error);
        }
    }
    try {
        return precisionToDecimal(value, bits, mantissa);
    }
    catch(error) {
        console.log(error);
    }
};

util.getPrecision = function getPrecision(value, options) {
    let bits = 32;
    let mantissa = 23;
    if (options && options.mode === 'half') {
        bits = 16;
        mantissa = 10;
    }
    else if (options && options.mode === 'single') {
        bits = 32;
        mantissa = 23;
    }
    else if (options && options.mode === 'double') {
        bits = 64;
        mantissa = 52;
    }
    let precision = decimalToPrecision(value, bits, mantissa);
    if (options && options.returnType === '16bitArray') {
        return createInt(precision, 16);
    }
    else if (options && options.returnType === '8bitArray') {
        return createInt(precision, 8);
    }
    return precision;
};