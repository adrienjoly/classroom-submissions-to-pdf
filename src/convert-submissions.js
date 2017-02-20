var fs = require('fs')
var async = require('async')
var converter = require('../lib/submission-converter')

// inputs
const groups = require('../groups.json')

const saveJSON = (file, o) => require('fs').writeFileSync(file, JSON.stringify(o, null, 2))

function convertSubmissions(classe, callback) {
  console.log('\nconverting submissions of classe', classe, '...')
  const filename = 'submissions-classe-' + classe
  const submissions = require('../' + filename + '.json')
  converter.extractSubmissions(submissions, function(err, studentSubmissions) {
    saveJSON(filename + '-converted.json', studentSubmissions)
    console.log(err || '=> rendered to ' + filename + '-converted.json')
    callback(err, studentSubmissions)
  })
}

async.mapSeries(Object.keys(groups), convertSubmissions, () => console.log('\ndone.'))
