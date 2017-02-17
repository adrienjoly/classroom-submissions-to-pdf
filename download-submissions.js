var fs = require('fs')
var gcla = require('./lib/google-classroom')
var googleClient = require('./lib/google-api-client')

// outputs
var filename = './submissions.json'

// inputs (classroom assignment)
//var [ courseId, assignmentId ] = [ '3001621381', '4287252912' ] // classe 1
//var [ courseId, assignmentId ] = [ '3001624136', '4287272941' ] // classe 3
var [ courseId, assignmentId ] = [ '3001638443', '4287252910' ] // classe 2

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
      saveJSON(filename, subs.studentSubmissions);
      //saveJSON(filename, subs.studentSubmissions.filter((s) => s.state === 'TURNED_IN'));
    })
  }
}

// auth using user_token.json or oauth
googleClient.auth(whenLogged)
