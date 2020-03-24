const http = require('http')
//
var opt = {
    host: 'game-park.net',
    method: 'GET',
    path: '/backend/api/v1/get_game_arr',
}
var is_game = false;
    
//
var body = '';
var promise = new Promise(function (resolve, reject) {
    //两个参数： resolve 成功的回调函数名  ， reject失败的回调函数名
    var req = http.request(opt, function (res) {
        console.log("response: " + res.statusCode);
        res.on('data', function (data) {
            body += data;
            console.log(888)
            console.log(body)
        }).on('end', function () {
            var a = JSON.parse(body)
            console.log(a.arr)
            var gamestr = a.arr;
            console.log(3333)
            console.log("gameeeeeeeeee")
            console.log(gamestr)
            is_game = gamestr.indexOf("assets.game-park.net") > -1;
            resolve(is_game)

        });
    }).on('error', function (e) {
        console.log(JSON.stringify(e))
        console.log("error: " + e.message);
    })
    req.end();
  });

  promise.then(function (data) {
    console.log('成功：' + data); // 若成功，运行结果：成功：111
  });
