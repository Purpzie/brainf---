// https://dogeon.xyz
// can parse into JSON and then turn it back into DSON

const keymap = {
  such: "{",
  is: ":",
  ",": ",",
  ".": ",",
  "!": ",",
  "?": ",",
  so: "[",
  and: ",",
  also: ",",
  many: "]",
  yes: "true",
  no: "false",
  empty: "null",
  wow: "}"
};
const keys = Object.keys(keymap);

module.exports.parse = parts => { // parts = DSON string
  let part;
  let result = "";
  let inArray = false;
  let num, e, int, dec, len;
  result = "";
  parts = parts
    // \u with 6 octal digits -> hex
    .replace(/(?<=(?<!\\)\\u)\d{6}/g, num => {
      num = parseInt(num, 8).toString(16);
      while (num.length < 4) num = "0" + num;
      return num;
    })
    // split into keywords/parts
    .match(/(?<!\\)"[^]*?(?<!\\)"|\d+\.?\d+(?:very\d+)?|[,.!?]|[^\s,.!?]+/gi);

  for (let i = 0; i < parts.length; i++) {
    part = parts[i];
    if (/^".*?"$/.test(part)) result += part;
    else if (/^\d/.test(part)) {
      // due to some difficulties this must be done in a weird way
      [num, e = 0] = part.split(/very/i);
      [int = 0, dec = null] = num.split(".");
      e = "e" + e;
      num = parseInt(Number(int + e), 8);
      if (dec) num += parseInt(Number(dec + e), 8) * 8 ** -dec.length;
      if (isNaN(num)) bork(i, part, "nomber such invalid");
      result += num;
    } else {
      part = part.toLowerCase();
      if (!keys.includes(part)) bork(i, part, "keyword such invalid");
      else switch (part) {
        case "so": inArray = true; break;
        case "many": inArray = false; break;
        case "and": case "also":
          if (!inArray) bork(i, part, "much keyword only be use in arrays");
          break;
        default:
          if (inArray && !["and", "also", "yes", "no", "empty"].includes(part))
           bork(i, part, "such invalid (much use 'and' or 'also' in arrays)");
      };
      result += keymap[part];
    };
  };

  // this checks for errors in the json anyways so
  return JSON.parse(result);
};

function bork(i, part, msg) {
  throw new Error(`part ${i} '${part}' | ${msg}`);
};

const JSONkeymap = {
  "{": "such ",
  ":": " is ",
  "[": "so ",
  "]": " many",
  true: "yes",
  false: "no",
  null: "empty",
  "}": " wow"
};

module.exports.serialize = json => {
  if (typeof json !== "string") json = JSON.stringify(json);
  else JSON.parse(json); // checks for errors
  json = json.match(/(?<!\\)"[^]*?(?<!\\)"|[{}:[\],]|[^\s{}:[\],]+/g);
  let result = "", inArray = false, part;
  for (let i = 0; i < json.length; i++) {
    part = json[i];
    if (/^".*?"$/.test(part)) result += part;
    else if (/^\d/.test(part)) result += Number(part).toString(8);
    else switch (part) {
      case ",":
        if (inArray) result += Math.round(Math.random()) ? " and " : " also ";
        else result += [",", ".", "!", "?"][Math.floor(Math.random()*4)] + " ";
        break;
      case "[": case "]":
        inArray = part === "[";
      // fallthrough
      default: result += JSONkeymap[part];
    };
  };
  return result;
};
