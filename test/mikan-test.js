const Mikan = require('../src/mikan.js');
const {ok, equal} = require('assert');

const case1 = Mikan('我輩は猫である。名前はまだない。');
ok(case1.indexOf('<span style="display:inline-block" role="presentation">') > -1);

const case2 = Mikan('私は好きにした。君たちも好きにしろ。', { className : 'wbr', style : '' });
ok(case2.indexOf('class="wbr"') > -1 && case2.indexOf('style=') <= -1);

const case3 = Mikan('え、蒲田に！？', { className : '', style : '' });
ok(case3.indexOf('class=') <= -1 && case3.indexOf('style=') <= -1);

const case4 = Mikan('原稿と防災服を用意してくれ', { className : '', style : 'font-weight:bold' });
ok(case4.indexOf('style="font-weight:bold"') > -1);
