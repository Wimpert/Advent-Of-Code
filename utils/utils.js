var fs = require('fs');

exports.readFileIntoStringArray = function(path){
  var contents = fs.readFileSync(path, 'utf8');
  return contents.split('\n');
}

exports.emptyFile = function(path){
  fs.writeFileSync(path, '');
}

exports.appendToFile = function(path, string){
  fs.appendFileSync(path,string);
  
}