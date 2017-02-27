var fs = require('fs')
var fetchers = require('../lib/fetchers')
var renderer = require('../lib/pdf-renderer')

// parameters
const url = process.argv[2]
const outFile = url.split('?')[0].split('/').pop()

function convertAndRenderSubmittedUrl(url, outFile, callback) {
  fetchers.fetchByUrl(url, function(err, code) {
    const html = renderer.renderCodeToHtml(code)
    fs.writeFileSync(outFile + '.html', html)
    console.log('=> rendered to ' + outFile + '.html')
    renderer.genPdfFileFromHtml(outFile + '.pdf', html, callback)
  })
}

convertAndRenderSubmittedUrl(url, outFile, function(err, res) {
  console.log(err || '=> rendered to ' + outFile + '.pdf')
})
