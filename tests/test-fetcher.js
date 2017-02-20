var fetchers = require('../lib/fetchers')

var url = 'https://jsfiddle.net/lucillevl/o5skom1u/'

console.log('\n' + url + '...')
fetchers.fetchByUrl(url, function(err, res) {
  console.log('\nHTML:\n\n' + res.html)
  console.log('\nJS:\n\n' + res.js)
})
