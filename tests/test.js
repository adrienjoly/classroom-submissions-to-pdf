var converter = require('../lib/submission-converter')

const sampleSubmissions = [ require('../samples/turned-in-student-submission.json') ]

converter.extractSubmissions(sampleSubmissions, function(err, studentSubmissions) {
  if (err) {
    console.log('=>', err)
  } else {
    studentSubmissions.forEach(function(subm, i) {
      console.log('- submission #' + i, '=>', subm.map(function(subm) {
        return subm.err || (subm.source.join(':') + ' -> ' + Object.keys(subm).join(', '))
      }))
    })
  }
  /*
  var html = pdfRenderer.renderHtml(studentSubmissions)
  console.log(html)
  pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
    console.log(err || 'Page Rendered to ' + outputFile)
  })
  */
})
