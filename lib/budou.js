"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Budou;

var re = new RegExp(/[一-龠々〆ヵヶ]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+|[,.、。！!？?()（）「」『』 　]+/g);
var joshi = new RegExp(/(でなければ|について|ならば|までを|までの|くらい|なのか|として|とは|なら|から|まで|して|だけ|より|ほど|など|って|では|は|で|を|の|が|に|へ|と|て)/g);

function SimpleAnalyze() {
  var str = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

  var s = str.replace(joshi, "$1|");
  var ary = s.split("|");
  var result = [];
  ary.forEach(function (word) {
    var token = word.match(re);
    if (token) {
      result = result.concat(token);
    }
  });
  return result;
}

function Budou() {
  var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
  var userOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var defaultOption = {
    style: 'display:inline-block',
    className: ''
  };
  var option = Object.assign({}, defaultOption, userOption);
  var attr = '';
  option.style && (attr += " style=\"" + option.style + "\"");
  option.className && (attr += " class=\"" + option.className + "\"");

  var tokens = SimpleAnalyze(text);
  var words = [];
  tokens.forEach(function (word) {
    if (word.match(/[,.、。！!？?()（）「」『』 　]+/) || word.match(joshi)) {
      words[words.length - 1] += word;
    } else {
      words.push(word);
    }
  });
  var html = words.map(function (word) {
    return "<span" + attr + ">" + word + "</span>";
  });
  return html.join('');
}
