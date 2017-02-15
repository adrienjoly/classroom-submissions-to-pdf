var fs = require('fs')
var converter = require('./lib/submission-converter')

// output (PDF-rendered student submissions)
var outputFile = './submissions-turned-in.pdf'

// input
const inputFile = './submissions-turned-in.json'

const turnedIn = require(inputFile)

converter.extractSubmissions(turnedIn, function(err, studentSubmissions) {
  if (err) {
    console.log('=>', err)
  } else {
    var html = converter.toHTML(studentSubmissions);
    fs.writeFileSync('./submissions-turned-in.html', html);
    converter.toPDF(outputFile, studentSubmissions, function(err) {
      console.log(err || 'Page Rendered to ' + outputFile)
    })
  }
})

// TODO: also support links in comments

// TODO: also support generic links (from any source)
