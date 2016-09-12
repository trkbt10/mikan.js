function SimpleAnalyze(str = '') {
  const re = new RegExp(/[一-龠々〆ヵヶ]+|[ぁ-ん]+|[ァ-ヴー]+|[a-zA-Z0-9]+|[ａ-ｚＡ-Ｚ０-９]+|[,.、。！!？?()（）「」『』 　]+/g);
  const joshi = new RegExp(/(でなければ|について|ならば|までを|までの|くらい|なのか|として|とは|なら|から|まで|して|だけ|より|ほど|など|って|では|は|で|を|の|が|に|へ|と|て)/g);
  const s = str.replace(joshi, "$1|");
  const ary = s.split("|");
  let result = [];
  ary.forEach((word) => {
    const token = word.match(re);
    if (token) {
      result = result.concat(token);
    }
  });
  return result;
}

export default function Budou(text = '', userOption = {}) {
  const defaultOption = {
    style : 'display:inline-block',
    className : ''
  };
  const option = Object.assign({}, defaultOption, userOption);
  let attr = '';
  option.style && (attr += ` style="${option.style}"`);
  option.className && (attr += ` class="${option.className}"`);

  const tokens = SimpleAnalyze(text);
  const words = [];
  tokens.forEach((word) => {
    if (word.match(/[,.、。！!？?()（）「」『』 　]+/)) {
      words[words.length - 1] += word;
    } else {
      words.push(word);
    }
  });
  const html = words.map((word) => {
    return `<span${attr}>${word}</span>`
  });
  return html.join('');
}
