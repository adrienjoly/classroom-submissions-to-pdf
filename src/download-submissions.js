var async = require('async')
var gcla = require('../lib/google-classroom')
var googleClient = require('../lib/google-api-client')

// inputs (classroom assignment)
const groups = require('../groups.json')

const saveJSON = (file, o) => require('fs').writeFileSync(file, JSON.stringify(o, null, 2))

function downloadSubmissions(classe, callback) {
  console.log('fetching submissions of classe', classe, '...')
  var group = groups[classe]
  gcla.listSubmissions(group.courseId, group.assignmentId, function(err, subs) {
    console.log('submissions from classroom =>', err || subs.studentSubmissions.length)
    saveJSON('./submissions-classe-' + classe + '.json', subs.studentSubmissions)
    //saveJSON(filename, subs.studentSubmissions.filter((s) => s.state === 'TURNED_IN'))
    callback(err, subs)
  })
}

// auth using user_token.json or oauth
googleClient.auth(function whenLogged(err, sesId) {
  if (err) {
    console.error('Error: ', err)
  } else {
    async.mapSeries(Object.keys(groups), downloadSubmissions, () => console.log('done.'))
  }
})
