var async = require('async')
var fetchers = require('./fetchers')

// returns [ { fetchedAttachments: [ { err || source,html,css,js } ] } ]
function extractSubmission(submission, callback) {
  var urls = submission.assignmentSubmission.attachments.map((a) => a.link.url)
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

module.exports = {
  extractSubmissions,
}
