import Budou from '../src/budou.js';
const {ok, equal} = require('assert');

const case1 = Budou('我輩は猫である。名前はまだない。');
ok(case1.indexOf('<span style="display:inline-block">') > -1);

const case2 = Budou('私は好きにした。君たちも好きにしろ。', { className : 'wbr', style : '' });
ok(case2.indexOf('class="wbr"') > -1 && case2.indexOf('style=') <= -1);

const case3 = Budou('え、蒲田に！？', { className : '', style : '' });
ok(case3.indexOf('class=') <= -1 && case3.indexOf('style=') <= -1);

const case4 = Budou('原稿と防災服を用意してくれ', { className : '', style : 'font-weight:bold' });
ok(case4.indexOf('style="font-weight:bold"') > -1);
