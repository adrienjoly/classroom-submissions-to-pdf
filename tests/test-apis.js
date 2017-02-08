var async = require('async')
var fetchers = require('../lib/fetchers')
/*
async.map([
  [ 'jsfiddle', 'u8B29' ],
  [ 'jsbin', 'foxego', 6 ],
  [ 'codepen', 'adrienjoly', 'WRMWWO' ],
], fetchers.fetchBySource.bind(fetchers), function(err, results) {
  console.log(err || results)
})
*/
async.mapSeries([
  'http://codepen.io/anon/pen/NdLJdb',
  'http://codepen.io/adrienjoly/pen/JEpVgV',
  'http://jsbin.com/fexiwasibu/edit?html,output',
  'http://jsbin.com/foxego/6/edit?html,js,output',
  'http://jsbin.com/foxego/6/',
  'http://jsbin.com/foxego/6',
  'https://jsfiddle.net/4c6drL5q/',
  'https://jsfiddle.net/adrienjoly/wL3pex4e/2/',
], function(url, callback) {
  console.log('\n' + url + '...')
  fetchers.fetchByUrl(url, function(err, res) {
    console.log('=>', err || res)
    callback(err, res)
  })
})
