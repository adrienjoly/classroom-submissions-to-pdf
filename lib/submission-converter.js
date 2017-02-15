var async = require('async')
var fetchers = require('./fetchers')

function extractSubmissions(turnedIn) {
  async.mapSeries(turnedIn, function(submission, callback) {
    console.log('submission.assignmentSubmission', submission.assignmentSubmission)
    var urls = submission.assignmentSubmission.attachments.map((a) => a.link.url)
    async.mapSeries(urls, function(url, callback) {
      console.log('\n' + url + '...')
      fetchers.fetchByUrl(url, callback)
    }, function(err, results) {
      console.log('results:', err || results)
    })
  }, function(err, results) {
    console.log('-', err || results)
  }, function(err, studentSubmissions) {
    var html = pdfRenderer.renderHtml(studentSubmissions)
    console.log(html)
    /*
    pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
      console.log(err || 'Page Rendered to ' + outputFile)
    })
    */
  })
}

module.exports = {
  extractSubmissions,
}
