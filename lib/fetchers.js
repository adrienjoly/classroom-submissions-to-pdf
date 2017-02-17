var async = require('async')

module.exports = {
  jsfiddle: function(sourceIds, callback) {
    require('jsfiddle').getFiddle(sourceIds.join('/'), callback)
  },
  jsbin: function(sourceIds, callback) {
    var JsbinClient = require("jsbin-client")
    var jsbin = new JsbinClient({})
    jsbin.read(sourceIds[0], sourceIds[1]).then(function(data) {
      callback(null, data)
    }, function(error) {
      callback(error, data)
    })
  },
  codepen: function(sourceIds, callback) {
    var request = require('request')
    var penUrl = 'http://codepen.io/' + sourceIds[0] + '/pen/' + sourceIds[1]
    async.map(['html', 'js', 'css'], function(ext, callback) {
      request(penUrl + '.' + ext, function (error, response, content) {
        //if (!error && response.statusCode == 200)
        var obj = {}
        obj[ext] = content
        callback(error, obj)
      })
    }, function(err, results) {
      callback(err, Object.assign.apply(Object, results))
    })
  },
  fetchBySource: function(source, callback) {
    //console.log('fetchBySource:', source)
    var sourceIds = source.slice() // clone array
    var sourceName = sourceIds.shift()
    this[sourceName].call(this, sourceIds, function(err, res) {
      res = res || {}
      callback(err, {
        source: source,
        js: res.js || res.javascript,
        css: res.css,
        html: res.html,
      })
    })
  },
  fetchByUrl: function(url, callback) {
    var parts = url.split(/[\?\#]/)[0].split('/').slice(2)
    var domain = parts.shift()
    if (parts[parts.length - 1] === '') {
      parts.pop()
    }
    //console.log('fetchByUrl:', parts)
    if (domain === 'codepen.io') {
      // http://codepen.io/anon/pen/NdLJdb
      // http://codepen.io/adrienjoly/pen/JEpVgV
      parts.splice(1, 1) // removes the "pen" part
      this.fetchBySource(['codepen'].concat(parts), callback)
    } else if (domain === 'jsbin.com') {
      // http://jsbin.com/fexiwasibu/edit?html,output
      // http://jsbin.com/foxego/6/edit?html,js,output
      if (parts[parts.length - 1] === 'edit') {
        parts.pop() // remove the "edit" part
      }
      this.fetchBySource(['jsbin'].concat(parts), callback)
    } else if (domain === 'jsfiddle.net') {
      // https://jsfiddle.net/4c6drL5q/
      // https://jsfiddle.net/adrienjoly/wL3pex4e/2/
      this.fetchBySource(['jsfiddle'].concat(parts), callback)
    } else {
      callback(null, { err: 'unsupported url: ' + url });
    }
  },
}
