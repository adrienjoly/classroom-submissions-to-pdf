var outputFile = '_test-pdf_output.pdf'
var html = '<html><style>body{color:red;}</style><body>blah blah blah</body></html>'

function genPdfFileFromHtml(filePath, html, callback) {
  require('phantom').create()
    .then(function(ph) {
      return ph.createPage()
    })
    .then(function(page) {
      return page.property('content', html) ? page : null
    })
    .then(function(page){
      return page.render(filePath) ? page : null
    })
    .then(function(page) {
      page.phantom.exit()
      callback()
    })
    .catch(callback)
}

genPdfFileFromHtml(outputFile, html, function(err) {
  console.log(err || 'Page Rendered to ' + outputFile)
})
