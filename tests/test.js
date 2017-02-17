var async = require('async')
var converter = require('../lib/submission-converter')
var students = require('../lib/student-profiles')

const outputFile = 'submissions-all.pdf'

//const sampleSubmissions = [ require('../samples/turned-in-student-submission.json') ]
const sampleSubmissions = [
  require('../submissions-classe-1.json'),
  require('../submissions-classe-2.json'),
  require('../submissions-classe-3.json'),
].reduce((acc, groupSubms) => acc.concat(groupSubms), [])

async.mapSeries(sampleSubmissions, function(subm, callback) {
  const attachments = subm.assignmentSubmission.attachments || []
  const name = students.getStudentById(subm.userId).name.fullName
  console.log('\nstudent:', name + ', attachments: ' + (attachments.length || '0 => skipping'))
  if (!attachments.length) {
    callback(null, null)
    return
  }
  converter.extractSubmission(subm, function(err, subm) {
    if (err) {
      console.log('=>', err)
      callback(err)
    } else {
      console.log('=>', subm.fetchedAttachments.map(function(att) {
        return att.err || (att.source.join(':') + ' -> ' + Object.keys(att).join(', '))
      }))
      if (subm.fetchedAttachments.length > 1) {
        console.warn('\n   WARNING: student has more than 1 fetched attachment!')
      }
      if (subm.fetchedAttachments.length !== attachments.length) {
        console.warn('\n   WARNING: not all student\'s attachments were fetched')
      }
      //console.log('=> (enriched)', converter.getEnrichedAttachments(subm))
      callback(null, subm)
    }
  })
}, function(err, studentSubmissions) {
  console.log('\n=>', studentSubmissions.length, 'students')
  studentSubmissions = studentSubmissions.filter((subm) => !!subm) // remove null items
  console.log('  ', studentSubmissions.length, 'have submitted a copy')

  //var html = converter.toHTML(studentSubmissions)
  //console.log('\n=> HTML:', html)
  converter.toPDF(outputFile, studentSubmissions, function(err) {
    console.log(err || '\nrendered to ' + outputFile)
  })
})
