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
        var token = gcla.getSessionToken()
        //console.log('=> err:', err, 'token:', token, 'sesId:', sesId)
        if (!err && token) {
          saveJSON(TOKEN_FILE, token)
          console.log('(i) saved session to token file:', TOKEN_FILE)
        } else {
          console.log('(i) did not save session token')
        }
      })
    })
  }

  try {
    console.log('trying to read session token from ' + TOKEN_FILE + '...')
    const token = require('../' + TOKEN_FILE)
    //console.log('=> token:', token)
    gcla.getSessionFromToken(token, (err, sesId) => {
      if (err) {
        console.log('failed => trying manual auth...')
        auth(callback)
      } else {
        callback(err, sesId)
      }
    })
  } catch(e) {
    console.error(e)
  }
}
