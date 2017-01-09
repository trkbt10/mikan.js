# Mikan.js - 機械学習を用いていない日本語改行問題へのソリューション
mikan.jsは、正規表現を用いた簡易形態素解析による、単語の改行問題への解決策を提供します。

## インストール
`npm install mikan.js`

## 使い方

nodeで用いる場合

```
import Mikan from 'mikan.js';
const text = Mikan('常に最新、最高のモバイル。Androidを開発した同じチームから。');

console.log(text);
/*
<span style="display:inline-block" role="presentation">常に</span>
<span style="display:inline-block" role="presentation">最新、</span>
<span style="display:inline-block" role="presentation">最高の</span>
<span style="display:inline-block" role="presentation">モバイル。</span>
<span style="display:inline-block" role="presentation">Androidを</span>
<span style="display:inline-block" role="presentation">開発</span>
<span style="display:inline-block" role="presentation">した</span>
<span style="display:inline-block" role="presentation">同じ</span>
<span style="display:inline-block" role="presentation">チームから。</span>
*/
```

Webで用いる場合

```
<div id="sample"></div>
<script src="mikan-web.js"></script>
<script>
  var sampleElement = document.getElementById('sample');
  sampleElement.innerHTML = Mikan('常に最新、最高のモバイル。Androidを開発した同じチームから。');
</script>
```
