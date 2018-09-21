/*
  https://github.com/dogescript/DSON.djs
  Translated to JS, cleaned up and optimized by Purpzie.
*/
// https://github.com/dogescript/DSON.djs/blob/master/src/lib/parse.djs
function parse(string) {
  var output;
  const keys = string.match(/\S+/g);
  var currentKey = false;
  // @todo - clean this regex up 
  var tokenRegex = /^"|"$|"\.$|",$|,$|\.$/g;
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    if (key === 'such') {
      if (typeof output === 'undefined') {
        if (keys[keys.length - 1] === 'wow') output = {};
        continue;
      } else if (currentKey) {
        if (keys[i - 1] !== 'is') continue; // not a valid value definition, keep going 
        var part = keys.slice(i, keys.indexOf('wow', i) + 1);
        part = keys.splice(i, part.length);
        part = part.join(' ');
        output[currentKey] = parse(part);
      }
    } else if (key === 'wow') continue; // already covered with such case
    else if (key.indexOf('"') !== -1) {
      // it's a string 
      // @todo - unicode string support as in spec 
      // we're defining a key 
      if (currentKey === false) {
        currentKey = key = key.replace(tokenRegex, '');
        // create the key 
        output[key] = null;
        continue;
      } else if (currentKey) {
        if (keys[i - 1] !== 'is') continue; // not a valid value definition, keep going
        output[currentKey] = key = key.replace(tokenRegex, '');
        currentKey = false;
        continue;
      }
    } else if (key === 'so' && currentKey) {
      // it's an array 
      if (keys[i - 1] !== 'is') continue; // not a valid value definition, keep going
      output[currentKey] = [];
      // append values 
      for (var j = i += 1; j < keys.length; j += 1) {
        key = keys[j].replace(tokenRegex, '');
        if (key === 'many') break;
        else if (key === 'and' || key === 'also') continue;
        else output[currentKey].push(key);
      }
    } else if (key.match(/^\d/) && currentKey) {
      // it's a number 
      key = key.replace('very', 'e').replace('VERY', 'E');
      // DSON 2 is in octal 
      output[currentKey] = parseInt(Number(key), 8);
    } else if (currentKey) switch (key) {
      case 'yes':
        output[currentKey] = true;
        break;
      case 'no':
        output[currentKey] = false;
        break;
      case 'empty':
        output[currentKey] = null;
    }
  }
  return output;
}
module.exports = parse;
