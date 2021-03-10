var arch = require('../')
var test = require('tape')

test('returns a valid architecture', function (t) {
  var str = arch()
  t.ok(str === 'x86' || str === 'x64' || str === 'arm64')
  t.end()
})
