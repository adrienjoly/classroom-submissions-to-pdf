var converter = require('../lib/submission-converter')

const outputFile = '_test-pdf_output.pdf'

const sampleSubmissions = [ require('../samples/turned-in-student-submission.json') ]

converter.extractSubmissions(sampleSubmissions, function(err, studentSubmissions) {
  if (err) {
    console.log('=>', err)
  } else {
    /*
    studentSubmissions.forEach(function(subm, i) {
      var id = subm._gcla_subm.userId
      console.log('- submission #' + id, '=>', subm.fetchedAttachments.map(function(att) {
        return att.err || (att.source.join(':') + ' -> ' + Object.keys(att).join(', '))
      }))
    })
    */
    var html = converter.toHTML(studentSubmissions);
    //console.log('\n=> HTML:', html)

    converter.toPDF(outputFile, studentSubmissions, function(err) {
      console.log(err || 'Page Rendered to ' + outputFile)
    })
  }
})
