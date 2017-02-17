var fs = require('fs')
var converter = require('../lib/submission-converter')

// output (PDF-rendered student submissions)
var outputFile = './submissions-classe-1.pdf' // TODO: for each group
var htmlOutputFile = './submissions-classe-1.html' // TODO: for each group

// input
const inputFile = '../submissions-classe-1.json' // TODO: for each group

const turnedIn = require(inputFile)

converter.extractSubmissions(turnedIn, function(err, studentSubmissions) {
  if (err) {
    console.log('=>', err)
  } else {
    var html = converter.toHTML(studentSubmissions)
    fs.writeFileSync(htmlOutputFile, html)
    converter.toPDF(outputFile, studentSubmissions, function(err) {
      console.log(err || 'Page Rendered to ' + outputFile)
    })
  }
})

// TODO: also support generic links (from any source)
