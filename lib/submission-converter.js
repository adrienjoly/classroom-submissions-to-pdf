var async = require('async')
var fetchers = require('./fetchers')

// returns an array of { err || source,html,css,js }, one item per attached link
function extractSubmission(submission, callback) {
  var urls = submission.assignmentSubmission.attachments.map((a) => a.link.url)
  async.mapSeries(urls, function(url, next) {
    console.log('\n' + url + '...')
    fetchers.fetchByUrl(url, next)
  }, callback)
}

// returns an array of arrays (submission -> attachment -> { err || source,html,css,js })
function extractSubmissions(turnedIn, callback) {
  async.mapSeries(turnedIn, extractSubmission, callback)
}

module.exports = {
  extractSubmissions,
}
