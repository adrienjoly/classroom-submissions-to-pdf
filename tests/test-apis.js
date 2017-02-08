var async = require('async')
var fetchers = require('../lib/fetchers')

async.map([
  [ 'jsfiddle', 'u8B29' ],
  [ 'jsbin', 'foxego', 6 ],
  [ 'codepen', 'adrienjoly', 'WRMWWO' ],
], fetchers.fetchBySource.bind(fetchers), function(err, results) {
  console.log(err || results)
})
