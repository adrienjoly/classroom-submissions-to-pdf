var phantom = require('phantom')

var outputFile = '_test-pdf_output.pdf'
var html = '<html><style>body{color:red;}</style><body>blah blah blah</body></html>'

phantom.create().then(function(ph) {
  ph.createPage().then(function(page) {
    page.property('content', html)
    page.render(outputFile).then(function() {
      console.log('Page Rendered to', outputFile)
      ph.exit()
    })
  })
})
