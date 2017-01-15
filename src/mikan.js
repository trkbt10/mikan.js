"use strict";
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // commonjs
    module.exports = factory();
  } else {
    // Browser globals
    root.Mikan = factory();
  }
})(this, function () {

  var joshi = /^(でなければ|について|ならば|までを|までの|くらい|なのか|として|とは|なら|から|まで|して|だけ|より|ほど|など|って|では|は|で|を|の|が|に|へ|と|て|じ)$/g;
  var keywords = /([\(（「『]+.*[\)）」』]|[a-zA-Z0-9]+\.[a-z]{2,}|[一-龠々〆ヵヶゝ]+|[ぁ-んゝ]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+)/g;
  var periods  = /([\.\,。、！\!？\?]+)$/

  function SimpleAnalyze(str) {
    var words = str.split(keywords).filter(function(word) {
      return word;
    });

    var result = [];
    var prevWordType = '';
    words.forEach(function(word) {
      var token = word.match(joshi) || word.match(periods);
      // 単語のあとの文字がひらがななら結合する
      if (token || (prevWordType === 'keyword' && word.match(/[ぁ-んゝ]+/g))) {
        result[result.length - 1] += (token instanceof Array) ? token.shift() : word;
        prevWordType = '';
        return;
      }
      prevWordType = 'keyword';
      result.push(word);
    });

    return result;
  }

  function Mikan() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var userOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var defaultOption = {
      style : 'display:inline-block',
      role: 'presentation',
      className : ''
    };
    var option = {};
    Object.keys(defaultOption).forEach(function(key) {
      option[key] = (typeof userOption[key] === 'undefined') ? defaultOption[key] : userOption[key];
    });

    var attr = '';
    option.style && (attr += " style=\"" + option.style + "\"");
    option.role && (attr += " role=\"" + option.role + "\"");
    option.className && (attr += " class=\"" + option.className + "\"");

    var words = SimpleAnalyze(text);

    var html = words.map(function(word) {
      return '<span' + attr +'>' + word + '</span>'
    }).join('');
    return html;
  }
  Mikan.split = SimpleAnalyze;
  return Mikan;
});
