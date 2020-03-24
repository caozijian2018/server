
var http = require("http");
 
var data = {
    username:"name",
    password:"123456"
};
data = JSON.stringify(data);

var opt = {
    host:'game-park.net',
    port:'80',
    method:'GET',
    path:'/backend/api/v1/get_game_arr',
    // headers:{
    //     "Content-Type": 'application/json',
    //     "Content-Length": data.length
    // }
}
 
var body = '';
var req = http.request(opt, function(res) {
    console.log("response: " + res.statusCode);
    res.on('data',function(data){
        body += data;
        console.log(888)
        console.log(body)
    }).on('end', function(){
        var a = JSON.parse(body)
        console.log(a.arr)
    });
}).on('error', function(e) {
    console.log("error: " + e.message);
})
req.write(data);
req.end();