var fs  = require("fs");
var path = require('path');

module.exports = function inlineSource(htmlcontent, options, fn) {
    var str = '';

    var SPACER = null;

    htmlcontent
        .split('\n')
        .forEach(function(line) {
            var code = line.toString();

            if (!SPACER) {
                if (/^\t{4}/.test(code)) {
                    SPACER = '\t\t\t\t';
                } else if (/^\t{2}/.test(code)) {
                    SPACER = '\t\t';
                } else if (/^\s{4}/.test(code)) {
                    SPACER = '    ';
                } else if (/^\s{2}/.test(code)) {
                    SPACER = '  ';
                }
            }

            if (/\.js\?__inline/.test(code)) {
                //var scripts = code.match(/src\=(\'|\")*.js(\'|\"")/g);
                var scripts = code.match(/src.*\.js\?__inline/g);
                if (scripts.length == 1) {
                    var filepath = scripts[0].replace(/\?__inline/, "").replace(/(\'|\")/, "").replace(/src\=/, "");
                    str += code.replace(/script.*/, "") + 'script.\n';
                    str += code.replace(/script.*/, "") + SPACER + fs.readFileSync(path.join(options.base || __dirname, filepath), 'utf8').replace(/\r\n/g, "").replace(/\n/g, "") + '\n';
                }            
            } else if (/\.css\?__inline/.test(code)) {
                //var scripts = code.match(/src\=(\'|\")*.js(\'|\"")/g);
                var scripts = code.match(/href.*\.css\?__inline/g);

                if (scripts.length == 1) {
                    var filepath = scripts[0].replace(/\?__inline/, "").replace(/(\'|\")/, "").replace(/href\=/, "");
                    str += code.replace(/link.*/, "") + 'style.\n';
                    str += code.replace(/link.*/, "") + SPACER + fs.readFileSync(path.join(options.base || __dirname, filepath), 'utf8').replace(/\r\n/g, "").replace(/\n/g, "") + '\n';
                }            
            } else {
                str += line.toString() + '\n';
            }
        });

    if (typeof fn === 'function') {
        fn(null, str);
    }

    return str;
}