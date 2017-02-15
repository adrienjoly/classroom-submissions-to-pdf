var fs = require('fs')
var readline = require('readline');
var gcla = require('./lib/google-classroom')

// outputs
var filename = [
  './submissions.json',
  './submissions-turned-in.json',
]

// inputs (classroom assignment)
var courseId = '3001621381';
var assignmentId = '4287252912';

var submissionIsTurnedIn = (s) => s.state === 'TURNED_IN';

const saveJSON = (file, json) => {
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
  console.log('Saved JSON to', file)
}

function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err);
  } else {
    gcla.listSubmissions(courseId, assignmentId, function(err, subs) {
      console.log('submissions from classroom =>', err || subs.studentSubmissions.length)
      saveJSON(filename[0], subs);
      const turnedIn = subs.studentSubmissions.filter(submissionIsTurnedIn)
      saveJSON(filename[1], turnedIn);
    })
  }
}

function auth(callback) {
  var authUrl = gcla.generateAuthUrl();
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    gcla.getSessionFromCode(code, callback);
  });
}

auth(whenLogged);
