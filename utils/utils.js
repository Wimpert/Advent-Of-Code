var fs = require('fs');

exports.readFileIntoStringArray = function(path){
  var contents = fs.readFileSync(path, 'utf8');
  return contents.split('\n');
}