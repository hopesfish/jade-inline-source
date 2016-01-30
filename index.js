var lazy    = require("lazy"),
var fs  = require("fs");

 new lazy(fs.createReadStream('./MyVeryBigFile.csv'))
     .lines
     .forEach(function(line){
         console.log(line.toString());
     }
 );