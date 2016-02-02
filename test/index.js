var fs  = require("fs");
var inlineSource = require('../index');

var output = fs.createWriteStream('./demo-dist.jade');



inlineSource('./demo.jade', {base: 'test'}, function(err, html) {
    output.write(html);
})

/*
var fs = require('fs');
var byline = require('byline');

var stream = byline(fs.createReadStream('demo.jade'));
stream.on('line', function(line) { 
    // do stuff with line
    console.log(line.toString());
});
stream.pipe(fs.createWriteStream('./output');*/