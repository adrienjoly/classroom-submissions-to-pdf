var fs = require('fs')
var async = require('async')
var converter = require('../lib/submission-converter')

// inputs
const groups = require('../groups.json')

function convertSubmissions(classe, callback) {
  console.log('\nconverting submissions of classe', classe, '...')
  const filename = 'submissions-classe-' + classe
  const submissions = require('../' + filename + '.json')
  converter.extractSubmissions(submissions, function(err, studentSubmissions) {
    if (err) {
      console.log('=>', err)
      callback(err)
    } else {
      var html = converter.toHTML(studentSubmissions)
      fs.writeFileSync(filename + '.html', html)
      console.log('\ngenerating PDF file...')
      converter.toPDF(filename + '.pdf', studentSubmissions, function(err, res) {
        console.log(err || '=> rendered to ' + filename + '.pdf')
        callback(err, res)
      })
    }
  })
}

async.mapSeries(Object.keys(groups), convertSubmissions, () => console.log('\ndone.'))
