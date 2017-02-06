var PORT = process.env.PORT || 3000;

var express = require('express');
var serverMethods = require('./server-methods');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

function wrapMethod(fct){
  return function(call, callback) {
    console.log('received call to', fct.name, ':', call.request);
    return fct.apply(this, arguments);
  };
}

Object.keys(serverMethods).forEach(function(name){
  console.log(' - /' + name);
  app.get('/' + name, function(req, res) {
    var call = {
      request: req.query,
    };
    console.log('REQUEST TO', name, req.query);
    serverMethods[name](call, function(err, data) {
      res.json(err || data);
    });
  });
});

function startServer() {
  console.log('start HTTP server...');  
  app.listen(PORT, function () {
    console.log('HTTP server running on', PORT);
  });
}

startServer();
