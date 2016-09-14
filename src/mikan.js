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
  var re = new RegExp(/[一-龠々〆ヵヶゝ]+|[ぁ-んゝ]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+|[,.、。！!？?()（）「」『』 　]+/g);
  var joshi = new RegExp(/(でなければ|について|ならば|までを|までの|くらい|なのか|として|とは|なら|から|まで|して|だけ|より|ほど|など|って|では|は|で|を|の|が|に|へ|と|て|じ)/g);

  function SimpleAnalyze(str = '') {
    var result = [];
    str.replace(joshi, "$1|").split("|").forEach(function(word) {
      var token = word.match(re);
      if (token) {
        result = result.concat(token);
      }
    });
    return result;
  }

  function Mikan() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var userOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var defaultOption = {
      style : 'display:inline-block',
      className : ''
    };
    var option = {};
    Object.keys(defaultOption).forEach(function(key) {
      option[key] = (typeof userOption[key] === 'undefined') ? defaultOption[key] : userOption[key];
    });

    var attr = '';
    option.style && (attr += " style=\"" + option.style + "\"");
    option.className && (attr += " class=\"" + option.className + "\"");

    var words = [];
    SimpleAnalyze(text).forEach(function(word) {
      if (word.match(/[,.、。！!？?()（）「」『』 　]+/) || word.match(joshi)) {
        words[words.length - 1] += word;
      } else {
        words.push(word);
      }
    });

    var html = words.map(function(word) {
      return '<span' + attr +'>' + word + '</span>'
    }).join('');
    return html;
  }
  return Mikan;
});
