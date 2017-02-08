var pdfRenderer = require('../lib/pdf-renderer')

var outputFile = '_test-pdf_output.pdf'

var students = [
  { name: 'a' },
  { name: 'b' },
]

var html = pdfRenderer.renderHtml(students)

console.log(html)

pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
  console.log(err || 'Page Rendered to ' + outputFile)
})
