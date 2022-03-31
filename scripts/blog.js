'use strict';

const fs = require('fs');
const xml2js = require('xml2js');

const handler = module.exports = {};

handler.response = (msg) => {
    if (!msg.startsWith('blog ')) {
        return;
    }
    let returnMsg = '';
    const keywords = msg.substr(5).trim().toLowerCase().split(/[\s\-]+/);
    const searchXml = fs.readFileSync('./search.xml', 'utf-8');
    xml2js.parseString(searchXml, function (error, xml) {
        const data = xml.search.entry.map(function (entry) {
            return {
                title: entry.title[0],
                content: entry.content[0]['_'],
                url: entry.url[0]
            };
        });

        data.forEach(function (d) {
            let isMatch = true;
            const title = d.title.trim().toLowerCase();
            const content = d.content.trim().replace(/<[^>]+>/g, "").toLowerCase();

            keywords.forEach(function (keyword, i) {
                if (title.indexOf(keyword) < 0 && content.indexOf(keyword) < 0) {
                    isMatch = false;
                }
            });

            if (isMatch) {
                returnMsg += '* ' + d.title + '\nhttps://alphahinex.github.io' + d.url + '\n';
            }
        });

        handler.envelop(returnMsg.trim());
    });

};
