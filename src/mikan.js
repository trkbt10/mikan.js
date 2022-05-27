/*! mikan.js v1.0.13 | MIT License | https://github.com/trkbt10/mikan.js/blob/master/LICENSE */

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

  var joshi = /(でなければ|について|かしら|くらい|けれど|なのか|ばかり|ながら|ことよ|こそ|こと|さえ|しか|した|たり|だけ|だに|だの|つつ|ても|てよ|でも|とも|から|など|なり|ので|のに|ほど|まで|もの|やら|より|って|で|と|な|に|ね|の|も|は|ば|へ|や|わ|を|か|が|さ|し|ぞ|て)/g;
  var numbers = /([0-9０-９零一二三四五六七八九十]+)/;
  var keywords = /(\&nbsp;|[a-zA-Z0-9]+\.[a-z]{2,}|[一-龠々〆ヵヶゝ]+|[ぁ-んゝ]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+)/g;
  var periods = /([\.\,。、！\!？\?]+)$/g
  var units = /(px|point|＄|\$|€|￥|ノット|ユーロ|ドル|円|里|百|千|万|億|兆|京|㌫|％|\%|cm|m|km|㌢|㍍|㌖|センチメートル|メートル|キロ|キロメートル|°|度|ℓ|リットル|mℓ|ミリリットル|マイル|フィート)/i;
  var bracketsBegin = /([〈《「『｢（(\[【〔〚〖〘❮❬❪❨(<{❲❰｛❴])/g
  var bracketsEnd = /([〉》」』｣)）\]】〕〗〙〛}>\)❩❫❭❯❱❳❵｝])/g



  function SimpleAnalyze(str) {
    if (!str) {
      return [''];
    }
    var words = str.split(keywords).reduce(function (prev, word) {
      return [].concat(prev, word.split(joshi));
    }, []).reduce(function (prev, word) {
      return [].concat(prev, word.split(numbers));
    }, []).reduce(function (prev, word) {
      return [].concat(prev, word.split(bracketsBegin));
    }, []).reduce(function (prev, word) {
      return [].concat(prev, word.split(bracketsEnd));
    }, []).filter(function (word) {
      return word;
    });
    var result = [];
    var prevType = '';
    var prevWord = '';
    words.forEach(function (word) {
      var periodToken = word.match(periods);
      var joshiToken = word.match(joshi);
      var token = periodToken || joshiToken;
      if (word.match(numbers)) {
        result.push(word);
        prevType = 'number';
        prevWord = word;
        return
      }
      // 前が数字で、後ろが単位であれば数字と単位を結合する
      if (word.match(units) && prevType === 'number') {
        result[result.length - 1] += word;
        prevType = 'unit';
        prevWord = word;
        return
      }
      if (word.match(bracketsBegin)) {
        prevType = 'bracketBegin';
        prevWord = word;
        return
      }
      if (word.match(bracketsEnd)) {
        result[result.length - 1] += word;
        prevType = 'bracketEnd';
        prevWord = word;
        return
      }

      if (prevType === 'bracketBegin') {
        word = prevWord + word
        prevWord = ''
        prevType = ''
      }

      // すでに文字が入っている上で助詞が続く場合は結合する（[単語][て|を|に|は|など]の形にする）
      if (result.length > 0 && token && prevType === '') {
        result[result.length - 1] += word;
        prevType = 'keyword';
        prevWord = word;
        return
      }

      // 単語のあとの文字がひらがななら結合する
      if (result.length > 1 && token || (prevType === 'keyword' && !prevWord.match(/^[とのに]$/g) && !prevWord.match(periods) && word.match(/[ぁ-んゝ]+/g))) {
        result[result.length - 1] += word;
        if (!joshiToken) prevType = ''
        prevWord = word;
        return;
      }
      result.push(word);
      prevType = 'keyword';
      prevWord = word;
    });

    return result;
  }

  function Mikan() {
    var text = arguments.length <= 0 || arguments[0] === undefined
      ? ''
      : arguments[0];
    var userOption = arguments.length <= 1 || arguments[1] === undefined
      ? {}
      : arguments[1];

    var defaultOption = {
      style: 'display:inline-block',
      role: 'presentation',
      className: ''
    };
    var option = {};
    Object.keys(defaultOption).forEach(function (key) {
      option[key] = (typeof userOption[key] === 'undefined')
        ? defaultOption[key]
        : userOption[key];
    });

    var attr = '';
    option.style && (attr += " style=\"" + option.style + "\"");
    option.role && (attr += " role=\"" + option.role + "\"");
    option.className && (attr += " class=\"" + option.className + "\"");

    var words = SimpleAnalyze(text);

    var html = words.map(function (word) {
      return '<span' + attr + '>' + word + '</span>'
    }).join('');
    return html;
  }
  Mikan.split = SimpleAnalyze;
  return Mikan;
});
