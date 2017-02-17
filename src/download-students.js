var async = require('async')
var gcla = require('../lib/google-classroom')
var googleClient = require('../lib/google-api-client')

const groups = require('../groups.json')

const saveJSON = (file, o) => require('fs').writeFileSync(file, JSON.stringify(o, null, 2))

function fetchStudents(classe, callback) {
  console.log('fetching students of classe', classe, '...')
  gcla.listStudents(groups[classe].courseId, function(err, res) {
    console.log('=> students:', err || res.students.length)
    saveJSON('students-classe-' + classe + '.json', res)
    callback(err, res)
  })
}

// auth using user_token.json or oauth
googleClient.auth(function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err)
  } else {
    async.mapSeries(Object.keys(groups), fetchStudents, () => console.log('done.'))
  }
})
