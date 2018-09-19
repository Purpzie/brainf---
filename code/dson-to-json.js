/*
  https://github.com/dogescript/DSON.djs
  Translated to JS, cleaned up and optimized by Purpzie.
*/

// https://github.com/dogescript/DSON.djs/blob/master/src/lib/parse.djs
const tokenRegex = /^"|"$|"\.$|",$|,$|\.$/g;
function parse(string) {
  const keys = string.match(/\S+/g);
  var output;
  var currentKey = false;
  for (var i = 0; i < keys.length; i += 1) {
    var key = keys[i];
    if (key === 'such') {
      if (typeof output === 'undefined') {
        if (keys[keys.length - 1] === 'wow') output = {};
        continue;
      } else if (currentKey) {
        if (keys[i - 1] !== 'is') continue;
        var str = keys.slice(i, keys.indexOf('wow', i) + 1);
        str = keys.splice(i, str.length);
        str = str.join(' ');
        output[currentKey] = parse(str);
      }
    } else if (key === 'wow') continue;
    else if (key.indexOf('"') !== -1) {
      if (currentKey === false) {
        key = key.replace(tokenRegex, '');
        currentKey = key;
        output[key] = null;
        continue;
      } else if (currentKey) {
        if (keys[i - 1] !== 'is') continue;
        key = key.replace(tokenRegex, '');
        output[currentKey] = key;
        currentKey = false;
        continue;
      }
    } else if (key === 'so' && currentKey) {
      if (currentKey) {
        if (keys[i - 1] !== 'is') continue;
        output[currentKey] = [];
        for (var j = i += 1; j < keys.length; j += 1) {
          key = keys[j].replace(tokenRegex, '');
          if (key === 'many') break;
          else if (key === 'and' || key === 'also') continue;
          else output[currentKey].push(key);
        }
      }
    } else if (key.match(/^\d/) && currentKey) {
      key = key.replace('very', 'e').replace('VERY', 'E');
      output[currentKey] = parseInt(Number(key), 8);
    } else if (currentKey) {
      switch(key) {
        case 'yes':
          output[currentKey] = true;
          break;
        case 'no':
          output[currentKey] = false;
          break;
        case 'empty':
          output[currentKey] = null
      }
    }
  }
  return output;
}

module.exports = parse;
