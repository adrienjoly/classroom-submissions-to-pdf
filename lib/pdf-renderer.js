var phantom = require('phantom')

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
  phantom.create()
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

module.exports = {
  renderHtml: renderHtml,
  genPdfFileFromHtml: genPdfFileFromHtml,
}
