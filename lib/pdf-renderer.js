//var phantom = require('phantom')
var pdf = require('html-pdf')

function renderHtml(students) {
  function renderWhiteSpace(code) {
    return (code || '')
      .replace(/$ /g, '·')     // spaces -> middle dots
      .replace(/\t/g, '↦   ') // tabs -> arrow + 3 spaces
  }
  function renderCodeWithWhiteSpace(code) {
    return '<pre><code><xmp>' + renderWhiteSpace(code) + '</xmp></code></pre>'
  }
  function renderStudentHtml(student) {
    return [
      '<section>',
      '  <p>Etudiant: ' + student.name + ' (' + (student.source || []).join(':') + ')</p>',
      '  <table>',
      '  <tr>',
      '      <th>Fonctionnement / 10 pts</th>',
      '      <th>Qualité du code / 10 pts</th>',
      '      <th>Bonus / malus</th>',
      '      <th>Note totale / 20 pts</th>',
      '    </tr>',
      '    <tr>',
      '      <td></td>',
      '      <td></td>',
      '      <td>',
      student._gcla_subm.late ? '<p>- Rendu en retard</p>' : '',
      (student.html || '').split('\n').length > 100 ? '<p>- Fichier HTML &gt;100 lignes</p>' : '',
      (student.js || '').split('\n').length > 100 ? '<p>- Fichier JS &gt;100 lignes</p>' : '',
      '      </td>',
      '      <td></td>',
      '    </tr>',
      '  </table>',
      '  ' + renderCodeWithWhiteSpace(student.err || student.html),
      '  ' + renderCodeWithWhiteSpace(student.js),
//      '  ' + renderCodeWithWhiteSpace(student.css),
      '</section>',
    ].join('\n')
  }
  return [].concat([
    '<!DOCTYPE html>',
    '<html>',
    '  <head>',
    '    <style>',
    '      body { font-size: 10px; }',
    '      section { border-top: 2px solid blue; page-break-after: always; }',
    '      table, th, td { border: 1px solid gray; border-collapse: collapse; }',
    '      table { width: 100%; }',
    '      tr { height: 50px; }',
    '      th { width: 25%; }',
    '      pre { background-color: #eee; }',
    '      xmp { white-space: pre-wrap; }',
    '    </style>',
    '  </head>',
    '  <body>',
  ], students.map(renderStudentHtml), [
    '  </body>',
    '</html>',
  ]).join('\n')
}

function genPdfFileFromHtml(filePath, html, callback) {
  /*
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
    */
  var options = { format: 'Letter' }
  pdf.create(html, options).toFile(filePath, callback);
}

module.exports = {
  renderHtml: renderHtml,
  genPdfFileFromHtml: genPdfFileFromHtml,
}
