const mikan = require('../src/mikan.js')
const test = require('ava')


test(t => {
  const source = '桜の花の落ちるスピード。秒速5センチメートル'
  const expected = [
    "桜の",
    "花の",
    "落ちる",
    "スピード。",
    "秒速",
    "5センチメートル"
  ]

  const queue = mikan.split(source)
  const result = mikan(source)

  t.deepEqual(queue, expected)
  t.truthy(result.indexOf('<span style="display:inline-block" role="presentation">') > -1)
})

test(t => {
  const source = 'ページの読み込みが 50%加速'
  const expected = ['ページの', '読み', '込みが', ' ', '50%', '加速']
  const result = mikan.split(source)
  t.deepEqual(result, expected)
})
test(t => {
  const source = '赤道を抜け、嵐を抜け、氷を割り、日本から1万4000キロ'
  const expected = [
    "赤道を",
    "抜け、",
    "嵐を",
    "抜け、",
    "氷を",
    "割り、",
    "日本から",
    "1万", "4000キロ",
  ]

  const queue = mikan.split(source)
  const result = mikan(source)

  t.deepEqual(queue, expected)
  t.truthy(result.indexOf('<span style="display:inline-block" role="presentation">') > -1)
})

test(t => {
  const source = '母をたずねて三千里'
  const expected = [
    "母をたずねて",
    "三千里",
  ]

  const queue = mikan.split(source)
  const result = mikan(source)

  t.deepEqual(queue, expected)
  t.truthy(result.indexOf('<span style="display:inline-block" role="presentation">') > -1)
})

test(t => {
  const source = 'ヘディング190、高度32000、速度720ノット、なお南下中'
  const expected = [
    "ヘディング",
    "190、",
    "高度",
    "32000、",
    "速度",
    "720ノット、なお",
    "南下中",
  ]

  const queue = mikan.split(source)
  const result = mikan(source)

  t.deepEqual(queue, expected)
  t.truthy(result.indexOf('<span style="display:inline-block" role="presentation">') > -1)
})
