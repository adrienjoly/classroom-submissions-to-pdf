var async = require('async')
var fetchers = require('./fetchers')
var pdfRenderer = require('./pdf-renderer')

// returns [ { fetchedAttachments: [ { err || source,html,css,js } ] } ]
function extractSubmission(submission, callback) {
  var urls = ((submission.assignmentSubmission || {}).attachments || [])
    .map((a) => (a.link || {}).url)
    .filter((url) => !!url)
  async.mapSeries(urls, function(url, next) {
    console.log('\nFetching ' + url + '...')
    fetchers.fetchByUrl(url, next)
  }, function(err, fetchedAttachments) {
    callback(err, {
      _gcla_subm: submission, // original submission, as returned by google classroom API
      fetchedAttachments: fetchedAttachments,
    })
  })
}

// returns an array of objects (submission -> [ { fetchedAttachments } ])
function extractSubmissions(turnedIn, callback) {
  async.mapSeries(turnedIn, extractSubmission, callback)
}

function toHTML(studentSubmissions) {
  var allAttachments = studentSubmissions.reduce(function(acc, subm) {
    return [].concat.apply(acc, subm.fetchedAttachments.map(function(att) {
      return Object.assign({ name: subm._gcla_subm.userId }, att)
    }))
  }, [])
  return pdfRenderer.renderHtml(allAttachments)
}

function toPDF(outputFile, studentSubmissions, callback) {
  var html = toHTML(studentSubmissions)
  pdfRenderer.genPdfFileFromHtml(outputFile, html, callback)
}

module.exports = {
  extractSubmissions,
  extractSubmission,
  toHTML,
  toPDF,
}
