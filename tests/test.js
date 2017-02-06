var readline = require('readline');
var gcal = require('../lib/gcal');
var mappings = require('../lib/gcal-mappings');

function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err);
  } else {
    gcal.listEvents(sesId, function(err, events) {
      console.log(err || ('displaying ' + events.length + ' events:'));
      var translatedEvents = events.map(mappings.eventFromGcal);
      console.log('translated events:', translatedEvents);
      var eventId = translatedEvents[0].id;
      console.log('first event id:', eventId);
      gcal.getEvent(sesId, eventId, function() {
        console.log('=>', arguments);
      });
    });
  }
}

function auth(callback) {
  var authUrl = gcal.generateAuthUrl();
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    gcal.getSessionFromCode(code, callback);
  });
}

auth(whenLogged);
