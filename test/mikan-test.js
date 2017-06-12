const mikan = require('../src/mikan.js')
const test = require('ava')

function tagToArray(text = "") {
  return text.split(/<.*?>(.*?)<\/.*?>/g).filter((word) => word)
}


test(t => {
  const source = '常に最新、最高のモバイル。Androidを開発した同じチームから。'
  const expected = ['常に', '最新、', '最高の', 'モバイル。', 'Androidを', '開発した', '同じ', 'チームから。']

  const queue = mikan.split(source)
  const result = mikan(source)

  t.deepEqual(queue, expected)
  t.deepEqual(tagToArray(result), expected)
  t.truthy(result.indexOf('<span style="display:inline-block" role="presentation">') > -1)
})

test(t => {
  const source = '私は好きにした。君たちも好きにしろ。'
  const result = mikan(source, { className : 'wbr', style : 'font-weight:bold', role : 'debag' })
  t.truthy(result.indexOf('class="wbr"') > -1)
  t.truthy(result.indexOf('style="font-weight:bold"') > -1)
  t.truthy(result.indexOf('role="debag"') > -1)
})

test(t => {
  const source = 'え、蒲田に！？'
  const result = mikan(source, { className : '', style : '', role : '' })
  t.truthy(result.indexOf('class=') <= -1)
  t.truthy(result.indexOf('style=') <= -1)
  t.truthy(result.indexOf('role=') <= -1)
})

test(t => {
  const source = '原稿と防災服を用意してくれ'
  const expected = [ '原稿と', '防災服を', '用意してくれ' ]
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})

test(t => {
  const source = '1192'
  const expected = [ '1192' ]
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})
test(t => {
  const source = 'やりたいことのそばにいる'
  const expected = [ "やりたいことの", "そばに", "いる" ]
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})

test(t => {
  const source = 'このmikan.jsというライブラリは、スマートな文字区切りを可能にします。'
  const expected = [ 'この', 'mikan.jsと', 'いう', 'ライブラリは、', 'スマートな', '文字区切りを', '可能にします。' ]
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})

test(t => {
  const source = '「あれ」でもない、「これ」でもない。'
  const expected =  ['「あれ」', 'でもない、', '「これ」', 'でもない。']
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})

test(t => {
  const source = '半角スペース 対応'
  const expected = [ '半角', 'スペース', ' ', '対応' ]
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})
