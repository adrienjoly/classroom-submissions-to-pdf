var jsfiddle = require('jsfiddle')
jsfiddle.getFiddle('u8B29', function (err, fiddleObj) {
  console.log('jsfiddle =>', err || fiddleObj)
})

var JsbinClient = require("jsbin-client")
var jsbin = new JsbinClient({})
jsbin.read('foxego', 6).then(function(data) {
  console.log('jsbin =>', data)
}, function(error) {
  console.error('jsbin =>', error)
})
