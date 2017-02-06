var readline = require('readline');
var gcla = require('../lib/google-classroom');

function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err);
  } else {
    /*
    var courseId = '3001621381';
    var assignmentId = '4287252912';
    gcla.listSubmissions(courseId, assignmentId, function(err, subs) {
      console.log(err || subs);
    });
    */
    var courseName = 'JavaScript 1A - Classe 1';
    var courseWorkTitle = 'TP JS-CSS à rendre: Filtrage de produits';

    var courseByName = (c) => c.name === courseName;
    var courseWorkByTitle = (c) => c.title === courseWorkTitle;
    var submissionIsTurnedIn = (s) => s.state === 'TURNED_IN';

    console.log('fetching courses ...');
    gcla.listCourses(function(err, res) {
      console.log('=> courses:', err || courses);
      var courses = (res || {}).courses || [];
      var courseId = (courses.filter(courseByName)[0] || {}).id;
      console.log('fetching courseworks for course', courseId, '...');
      gcla.listCourseWorks(courseId, function(err, res) {
        console.log('=> courseworks:', err || res);
        var courseWork = (res || {}).courseWork || [];
        var courseWorkId = (courseWork.filter(courseWorkByTitle)[0] || {}).id;
        console.log('fetching submissions for coursework', courseWorkId, '...');
        gcla.listSubmissions(courseId, courseWorkId, function(err, res) {
          var subs = (res || {}).studentSubmissions || [];
          var turnedIn = subs.filter(submissionIsTurnedIn);
          console.log('=> submissions:', err || JSON.stringify(turnedIn, null, 2));
          console.log('=> attachments:', turnedIn[0].assignmentSubmission.attachments.map((a) => a.link.url));
          // =>
          // - http://jhovine.eemi.tech/Javascript/TP_Filtrage/
          // - http://codepen.io/SpaCeDuDe/pen/ygEdWr
        });
      });
    });
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
