var gcla = require('../lib/google-classroom')
var googleClient = require('../lib/google-api-client')

var [ courseId, assignmentId ] = [ '3001638443', '4287252910' ] // classe 2

function fetchStudents() {
  console.log('fetching students ...')
  gcla.listStudents(courseId, function(err, students) {
    console.log('=> students:', err || JSON.stringify(students, null, 2))
  })
}

// auth using user_token.json or oauth
googleClient.auth(function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err)
  } else {
    fetchStudents()
  }
})
