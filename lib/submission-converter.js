var async = require('async')
var fetchers = require('./fetchers')
var students = require('./student-profiles')
var pdfRenderer = require('./pdf-renderer')

// helper
const flatten = (arrays) => arrays.reduce((acc, arr) => [].concat.apply(acc, arr), [])

// returns [ { fetchedAttachments: [ { err || source,html,css,js } ] } ]
function extractSubmission(submission, callback) {
  var urls = ((submission.assignmentSubmission || {}).attachments || [])
    .map((a) => (a.link || {}).url)
    .filter((url) => !!url) // only keep URL attachments
    .reverse() // start with most recent attachment
  var fetchedOne = false
  // will keep iterating on attachments until one URL is fetched successfully
  async.mapSeries(urls, function(url, next) {
    //console.log('Fetching ' + url + '...')
    if (fetchedOne) {
      next()
    } else {
      fetchers.fetchByUrl(url, (err, res) => {
        fetchedOne = !res.err
          next(err, res)
      })
    }
  }, function(err, fetchedAttachments) {
    callback(err, {
      _gcla_subm: submission, // original submission, as returned by google classroom API
      fetchedAttachments: fetchedAttachments.filter((att) => !!att), // remove null values
    })
  })
}

// returns an array of objects (submission -> [ { fetchedAttachments } ])
function extractSubmissions(turnedIn, callback) {
  async.mapSeries(turnedIn, extractSubmission, callback)
}

// adds student metadata properties to attachments of a submission
function getEnrichedAttachments(subm) {
  const student = students.getStudentById(subm._gcla_subm.userId)
  return subm.fetchedAttachments.map((att) => Object.assign({
    userId: subm._gcla_subm.userId,
    name: student.name.fullName,
    email: student.emailAddress,
    _gcla_subm: subm._gcla_subm,
  }, att))
}

function toHTML(studentSubmissions) {
  var enrichedSubmissions = studentSubmissions.map(getEnrichedAttachments)
  var allAttachments = flatten(enrichedSubmissions)
  return pdfRenderer.renderHtml(allAttachments)
}

function toPDF(outputFile, studentSubmissions, callback) {
  var html = toHTML(studentSubmissions)
  pdfRenderer.genPdfFileFromHtml(outputFile, html, callback)
}

module.exports = {
  extractSubmissions,
  extractSubmission,
  getEnrichedAttachments,
  toHTML,
  toPDF,
}
