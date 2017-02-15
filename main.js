var readline = require('readline');
var gcla = require('./lib/google-classroom')
var pdfRenderer = require('./lib/pdf-renderer')

// inputs (classroom assignment)
var courseId = '3001621381';
var assignmentId = '4287252912';

// output (PDF-rendered student submissions)
var outputFile = 'student-submissions.pdf'

var extractSubmissions = require('./lib/submission-converter').extractSubmissions

/*
var submissionIsTurnedIn = (s) => s.state === 'TURNED_IN';

function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err);
  } else {
    gcla.listSubmissions(courseId, assignmentId, function(err, subs) {
      console.log('submissions from classroom =>', err || subs.studentSubmissions.length)
      extractSubmissions(subs.studentSubmissions.filter(submissionIsTurnedIn))
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
*/

extractSubmissions([ require('./samples/turned-in-student-submission.json') ])
