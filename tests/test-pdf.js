var outputFile = '_test-pdf_output.pdf'
var html = '<html><style>body{color:red;}</style><body>blah blah blah</body></html>'

function genPdfFileFromHtml(filePath, html, callback) {
  var phantom = require('phantom')
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.property('content', html)
      page.render(filePath).then(function() {
        ph.exit()
        callback()
      })
    })
  })
}

genPdfFileFromHtml(outputFile, html, function(err) {
  console.log('Page Rendered to', outputFile)
})
