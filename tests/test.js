var async = require('async')
var converter = require('../lib/submission-converter')
var students = require('../lib/student-profiles')

const outputFile = '_test-pdf_output.pdf'

//const sampleSubmissions = [ require('../samples/turned-in-student-submission.json') ]
const sampleSubmissions = require('../submissions-classe-3.json')

async.mapSeries(sampleSubmissions, function(subm, callback) {
  console.log('\nstudent:', students.getStudentById(subm.userId).name.fullName)
  converter.extractSubmission(subm, function(err, subm) {
    if (err) {
      console.log('=>', err)
      callback(err)
    } else {
      console.log('=>', subm.fetchedAttachments.map(function(att) {
        return att.err || (att.source.join(':') + ' -> ' + Object.keys(att).join(', '))
      }))
      callback(null, subm)
    }
  })
}, function(err, studentSubmissions) {
  //var html = converter.toHTML(studentSubmissions)
  //console.log('\n=> HTML:', html)
  converter.toPDF(outputFile, studentSubmissions, function(err) {
    console.log(err || 'Page Rendered to ' + outputFile)
  })
})
