var fs = require('fs')
var readline = require('readline')
var gcla = require('./google-classroom')

const TOKEN_FILE = 'user_token.json'

const saveJSON = (file, json) => {
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
  console.log('Saved JSON to', file)
}

exports.auth = function(callback) {

  function auth(callback) {
    var authUrl = gcla.generateAuthUrl()
    console.log('Authorize this app by visiting this url: ', authUrl)
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close()
      gcla.getSessionFromCode(code, function(err, sesId) {
        callback(err, sesId)
        saveJSON(TOKEN_FILE, gcla.getSessionToken())
        console.log('(i) saved session to token file:', TOKEN_FILE)
      })
    })
  }

  try {
    console.log('trying to read session token from ' + TOKEN_FILE + '...')
    const token = require('../' + TOKEN_FILE)
    //console.log('=> token:', token)
    gcla.getSessionFromToken(token, callback)
  } catch(e) {
    console.error(e)
    console.log('failed => manual auth...')
    auth(callback)
  }
}
