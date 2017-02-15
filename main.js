var readline = require('readline');
var async = require('async')
var gcla = require('./lib/google-classroom')
var fetchers = require('./lib/fetchers')
var pdfRenderer = require('./lib/pdf-renderer')

// inputs (classroom assignment)
var courseId = '3001621381';
var assignmentId = '4287252912';

// output (PDF-rendered student submissions)
var outputFile = 'student-submissions.pdf'

var submissionIsTurnedIn = (s) => s.state === 'TURNED_IN';

function processSubmissions(turnedIn) {
  async.mapSeries(turnedIn, function(submission, callback) {
    console.log('submission.assignmentSubmission', submission.assignmentSubmission)
    var urls = submission.assignmentSubmission.attachments.map((a) => a.link.url)
    async.mapSeries(urls, function(url, callback) {
      console.log('\n' + url + '...')
      fetchers.fetchByUrl(url, callback)
    }, function(err, results) {
      console.log('results:', err || results)
    })
  }, function(err, results) {
    console.log('-', err || results)
  }, function(err, studentSubmissions) {
    var html = pdfRenderer.renderHtml(studentSubmissions)
    console.log(html)
    /*
    pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
      console.log(err || 'Page Rendered to ' + outputFile)
    })
    */
  })
}
/*
function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err);
  } else {
    gcla.listSubmissions(courseId, assignmentId, function(err, subs) {
      console.log('submissions from classroom =>', err || subs.studentSubmissions.length)
      processSubmissions(subs.studentSubmissions.filter(submissionIsTurnedIn))
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

processSubmissions([ require('./samples/turned-in-student-submission.json') ])
