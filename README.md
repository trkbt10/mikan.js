# Budou.js - 機械学習を用いていない日本語改行問題へのソリューション
budou.jsは、正規表現を用いた簡易形態素解析による、単語の改行問題を解決します。

## インストール
`npm install budou.js`

## 使い方

nodeで用いる場合

```
import Budou from 'budou.js';
const text = Budou('常に最新、最高のモバイル。Androidを開発した同じチームから。');

console.log(text);
/*
<span style="display:inline-block">常</span>
<span style="display:inline-block">に</span>
<span style="display:inline-block">最新、</span>
<span style="display:inline-block">最高</span>
<span style="display:inline-block">の</span>
<span style="display:inline-block">モバイル。</span>
<span style="display:inline-block">Android</span>
<span style="display:inline-block">を</span>
<span style="display:inline-block">開発</span>
<span style="display:inline-block">した</span>
<span style="display:inline-block">同</span>
<span style="display:inline-block">じ</span>
<span style="display:inline-block">チーム</span>
<span style="display:inline-block">から。</span>
*/
```

Webで用いる場合

```
<div id="sample"></div>
<script src="budou-web.js"></script>
<script>
  var sampleElement = document.getElementById('sample');
  sampleElement.innerHTML = Budou('常に最新、最高のモバイル。Androidを開発した同じチームから。');
</script>
```
