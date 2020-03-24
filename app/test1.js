const https = require('https')
let url = "https://game-park.net/backend/api/v1/get_game_arr"

exports.handler =  function(event, context, callback) {
  https.get(url, (res) => {
    callback(null, res.statusCode)
  }).on('error', (e) => {
    callback(Error(e))
  })
}