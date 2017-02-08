var async = require('async')
var fetchers = require('../lib/fetchers')

async.parallel([

  function testJsFiddle(callback) {
    fetchers.fetchBySource([ 'jsfiddle', 'u8B29' ], callback)
  },

  function testJsBin(callback) {
    fetchers.fetchBySource([ 'jsbin', 'foxego', 6 ], callback)
  },

  function testCodePen(callback) {
    fetchers.fetchBySource([ 'codepen', 'adrienjoly', 'WRMWWO' ], callback)
  },

], function(err, results) {
  console.log(err || results.map(function(res) {
    return res.source + ' => ' + JSON.stringify(res, null, 2)//Object.keys(res).join(', ')
  }).join('\n'))
})
