var converter = require('../lib/submission-converter')

const sampleSubmissions = [ require('../samples/turned-in-student-submission.json') ]

converter.extractSubmissions(sampleSubmissions, function(err, studentSubmissions) {
  if (err) {
    console.log('=>', err)
  } else {
    studentSubmissions.forEach(function(subm, i) {
      var id = subm._gcla_subm.userId
      console.log('- submission #' + id, '=>', subm.fetchedAttachments.map(function(att) {
        return att.err || (att.source.join(':') + ' -> ' + Object.keys(att).join(', '))
      }))
    })
    /*
    var html = converter.toHtml(studentSubmissions);
    console.log('\n=> HTML:', html)
    */

    /*
    var pdfRenderer = require('../lib/pdf-renderer')
    var html = pdfRenderer.renderHtml(studentSubmissions)
    pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
      console.log(err || 'Page Rendered to ' + outputFile)
    })
    */
  }
})
