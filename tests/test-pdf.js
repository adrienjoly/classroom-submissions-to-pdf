var pdfRenderer = require('../lib/pdf-renderer')

var outputFile = '_test-pdf_output.pdf'

var students = [
  { name: 'a', source: [], html: 'html a', css: 'css a', js: '  js a\n\ttab' },
  { name: 'b', source: [], html: 'html b', css: 'css b', js: 'js b' },
]

var html = pdfRenderer.renderHtml(students)

console.log(html)

pdfRenderer.genPdfFileFromHtml(outputFile, html, function(err) {
  console.log(err || 'Page Rendered to ' + outputFile)
})
