const re = new RegExp(/[一-龠々〆ヵヶゝ]+|[ぁ-んゝ]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+|[,.、。！!？?()（）「」『』 　]+/g);
const joshi = new RegExp(/(でなければ|について|ならば|までを|までの|くらい|なのか|として|とは|なら|から|まで|して|だけ|より|ほど|など|って|では|は|で|を|の|が|に|へ|と|て|じ)/g);

function SimpleAnalyze(str = '') {
  let result = [];
  str.replace(joshi, "$1|").split("|").forEach((word) => {
    const token = word.match(re);
    if (token) {
      result = result.concat(token);
    }
  });
  return result;
}

module.exports = function Budou(text = '', userOption = {}) {
  const defaultOption = {
    style : 'display:inline-block',
    className : ''
  };
  const option = Object.assign({}, defaultOption, userOption);
  let attr = '';
  option.style && (attr += ` style="${option.style}"`);
  option.className && (attr += ` class="${option.className}"`);

  const words = [];
  SimpleAnalyze(text).forEach((word) => {
    if (word.match(/[,.、。！!？?()（）「」『』 　]+/) || word.match(joshi)) {
      words[words.length - 1] += word;
    } else {
      words.push(word);
    }
  });
  return words.map((word) => `<span${attr}>${word}</span>`).join('');
}
