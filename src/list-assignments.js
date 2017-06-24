var readline = require('readline')
var gcla = require('../lib/google-classroom')
var googleClient = require('../lib/google-api-client')

var renderItem = ({ id, name, title }) => ([ id, name || title ].join('\t'))
var renderItems = items => ('\n' + items.map(renderItem).join('\n'))

function fetchAssignments(courseId, callback) {
  //console.log('fetching courseworks for course', courseId, '...')
  gcla.listCourseWorks(courseId, function(err, res) {
    var courseWork = (res || {}).courseWork || []
    console.log('\n=> coursework for', courseId, ':',
      err || renderItems(courseWork))
    //var courseWorkId = (courseWork.filter(courseWorkByTitle)[0] || {}).id
    callback(err, courseWork)
  })
}

function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err)
  /*
  } else if (!sesId) {
    console.error('Error: invalid google session')
  */
  } else {
    console.log('fetching courses ...')
    gcla.listCourses(function(err, res) {
      var courses = (res || {}).courses || []
      console.log('=> courses:', err || renderItems(courses))
      console.log('fetching coursework for each course...')

      function next() {
        var nextCourse = courses.pop()
        if (nextCourse) {
          fetchAssignments(nextCourse.id, next)
        } else {
          console.log('done')
        }
      }
      next()
    })
  }
}

// auth using user_token.json or oauth
googleClient.auth(whenLogged)
