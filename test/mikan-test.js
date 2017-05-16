const Mikan = require('../src/mikan.js');
const {ok, equal} = require('assert');

const case1 = Mikan('常に最新、最高のモバイル。Androidを開発した同じチームから。');
const case1Split = Mikan.split('常に最新、最高のモバイル。Androidを開発した同じチームから。');
const case1result = ['常に', '最新、', '最高の', 'モバイル。', 'Androidを', '開発した', '同じ', 'チームから。'];
ok(case1.indexOf('<span style="display:inline-block" role="presentation">') > -1);
ok(tagToArray(case1).every((txt, i) => txt === case1result[i]));
ok(case1Split.every((txt, i) => txt === case1result[i]));

const case2 = Mikan('私は好きにした。君たちも好きにしろ。', { className : 'wbr', style : '' });
ok(case2.indexOf('class="wbr"') > -1 && case2.indexOf('style=') <= -1);

const case3 = Mikan('え、蒲田に！？', { className : '', style : '' });
ok(case3.indexOf('class=') <= -1 && case3.indexOf('style=') <= -1);

const case4 = Mikan('原稿と防災服を用意してくれ', { className : '', style : 'font-weight:bold' });
const case4result = [ '原稿と', '防災服を', '用意してくれ' ];
ok(case4.indexOf('style="font-weight:bold"') > -1);
ok(tagToArray(case4).every((txt, i) => txt === case4result[i]));

const case5 = Mikan('このmikan.jsというライブラリは、スマートな文字区切りを可能にします。', { className : '', style : '', role: "" });
const case5result = [ 'この', 'mikan.jsという', 'ライブラリは、', 'スマートな', '文字区切りを', '可能にします。' ];
ok(tagToArray(case5).every((txt, i) => txt === case5result[i]));

const case6 = Mikan('「あれ」でもない、「これ」でもない。');
const case6Split = Mikan.split('「あれ」でもない、「これ」でもない。');
const case6result = ['「あれ」でもない、', '「これ」でもない。'];
ok(case6.indexOf('<span style="display:inline-block" role="presentation">') > -1);
ok(tagToArray(case6).every((txt, i) => txt === case6result[i]));
ok(case6Split.every((txt, i) => txt === case6result[i]));


function tagToArray(text = "") {
  return text.split(/<.*?>(.*?)<\/.*?>/g).filter((word) => word);
}
