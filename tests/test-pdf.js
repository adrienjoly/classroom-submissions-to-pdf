var outputFile = '_test-pdf_output.pdf'

var students = [
  { name: 'a' },
  { name: 'b' },
]

function renderHtml(students) {
  function renderStudentHtml(student) {
    return '<p>' + student.name + '</p>'
  }
  return [].concat([
    '<!DOCTYPE html>',
    '<html>',
    '<style>',
    'body{color:red;}',
    '</style>',
    '<body>',
  ], students.map(renderStudentHtml), [
    '</body>',
    '</html>',
  ]).join('\n')
}

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

var html = renderHtml(students)

console.log(html)

genPdfFileFromHtml(outputFile, html, function(err) {
  console.log(err || 'Page Rendered to ' + outputFile)
})
