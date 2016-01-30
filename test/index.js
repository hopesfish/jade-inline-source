var lazy  = require("lazy");
var fs  = require("fs");

var output = fs.createWriteStream('./demo-dist.jade');

var SPACER = null;

new lazy(fs.createReadStream('./demo.jade'))
     .lines
     .forEach(function(line) {
        var code = line.toString();

        if (!SPACER) {
            if (/^\t{2}/.test(code)) {
                SPACER = '\t\t';
            } else if (/^\s{2}/.test(code)) {
                SPACER = '  ';
            }
        }

        if (/\.js\?__inline/.test(code)) {
            //var scripts = code.match(/src\=(\'|\")*.js(\'|\"")/g);
            var scripts = code.match(/src.*\.js\?__inline/g);
            if (scripts.length == 1) {
                var filepath = scripts[0].replace(/\?__inline/, "").replace(/(\'|"")/, "").replace(/src\=/, "");
                output.write('script.\n');
                output.write(SPACER + fs.readFileSync(__dirname + filepath, 'utf8') + '\n');
            }            
        } else {
            output.write(line.toString() + '\n');
        }
        
     });

/*
var fs = require('fs');
var byline = require('byline');

var stream = byline(fs.createReadStream('demo.jade'));
stream.on('line', function(line) { 
    // do stuff with line
    console.log(line.toString());
});
stream.pipe(fs.createWriteStream('./output');*/