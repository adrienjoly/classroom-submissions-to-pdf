var async = require('async')

async.parallel([

  function testJsFiddle(callback) {
    var jsfiddle = require('jsfiddle')
    var source = [ 'jsfiddle', 'u8B29' ]
    jsfiddle.getFiddle(source[1], function (err, fiddleObj) {
      callback(err, Object.assign({ source: source }, fiddleObj))
    })
  },

  function testJsBin(callback) {
    var JsbinClient = require("jsbin-client")
    var jsbin = new JsbinClient({})
    var source = [ 'jsbin', 'foxego', 6 ]
    jsbin.read(source[1], source[2]).then(function(data) {
      callback(null, Object.assign({ source: source }, data))
    }, function(error) {
      callback(error, Object.assign({ source: source }, data))
    })
  },

  function testCodePen(callback) {
    var request = require('request')
    var source = [ 'codepen', 'WRMWWO' ]
    var penUrl = 'http://codepen.io/adrienjoly/pen/' + source[1]
    async.map(['html', 'js', 'css'], function(ext, callback) {
      request(penUrl + '.' + ext, function (error, response, content) {
        //if (!error && response.statusCode == 200)
        var obj = { source: source }
        obj[ext] = content
        callback(error, obj);
      })
    }, function(err, results) {
      callback(err, Object.assign.apply(Object, results))
    })
  },

], function(err, results) {
  console.log(err || results.map(function(res) {
    return res.source + ' => ' + Object.keys(res).join(', ')
  }).join('\n'))
})
