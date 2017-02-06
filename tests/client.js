var PROTO_PATH = __dirname + '/../snoozer.proto';
var HOST = 'localhost:50051'; // or something like '0.tcp.ngrok.io:17802'

var readline = require('readline');
var grpc = require('grpc');
var protocol = grpc.load(PROTO_PATH).snoozer;

console.log('host:', HOST);
var client = new protocol.Snoozer(HOST, grpc.credentials.createInsecure());

function main(err, sesId) {
  console.log('calling listEvents ...');
  client.listEvents({ sesId: sesId }, function(err, response) {
    if (err) throw err;
    console.log('=> events:', response.events);
    var lastEventId = response.events.pop().id;
    client.swipeEvent({ sesId: sesId, eventId: lastEventId }, function(err, response) {
      console.log('swiped last event =>', arguments);
    })
  });
}

function auth(callback) {
  var authUrl = client.authToGoogleCalendar({}, function(err, response){
    console.log('Authorize this app by visiting this url: ', response.url);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      client.getSessionFromCode(code, function(err, response) {
        callback(err, (response || {}).sesId);
      });
    });
  });
}

auth(main);
