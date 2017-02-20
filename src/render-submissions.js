var fs = require('fs')
var async = require('async')
var converter = require('../lib/submission-converter')

// inputs
const groups = require('../groups.json')

function renderSubmissions(classe, callback) {
  console.log('\nrendering submissions of classe', classe, '...')
  const filename = 'submissions-classe-' + classe
  const studentSubmissions = require('../' + filename + '-converted.json')
  var html = converter.toHTML(studentSubmissions)
  fs.writeFileSync(filename + '.html', html)
  console.log('=> rendered to ' + filename + '.html')
  converter.toPDF(filename + '.pdf', studentSubmissions, function(err, res) {
    console.log(err || '=> rendered to ' + filename + '.pdf')
    callback(err, res)
  })
}

async.mapSeries(Object.keys(groups), renderSubmissions, () => console.log('\ndone.'))
