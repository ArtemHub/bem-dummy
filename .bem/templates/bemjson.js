'use strict';

var EOL = require('os').EOL;

module.exports = function (entity, naming) {
    return [
        "module.exports = {",
        "    block: 'page',",
        "    title: 'Page " + entity.block + "',",
        "    head: [",
        "        { elem: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1' } },",
        "        { elem: 'meta', attrs: { name: 'description', content: '' } },",
        "        { elem: 'css', url: '" + entity.block + ".min.css' }",
        "    ],",
        "    scripts: [{ elem: 'js', url: '" + entity.block + ".min.js' }],",
        "    content: []",
        "};",
        ""
    ].join(EOL);
};
