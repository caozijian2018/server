var express = require("express");
var app = express();
var gedtClientIp = require("./get_ip").gedtClientIp;
var des = require("./encode").des
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    // res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});
app.get('/backend/api/get_file_pass_token', (req, res) => {
    var ip = gedtClientIp(req);
    console.log(66666);
    console.log(ip)
    console.log(gedtClientIp(req))
    var Timestamp = new Date().getTime();
    var encrypt_text = des.encrypt(Timestamp + '$$'+ip+'$$123$$456$$567$$789');
    var decrypt_text = des.decrypt(encrypt_text)
    console.log(encrypt_text);
    //   req,
    //   headerasd: req.headers,
    res.send({
      asd: 123123,
      headerasd: req.headers,
      Timestamp,
      ip,
      file_token: encrypt_text,
      decrypt_text
    })
})
app.use(express.static('./public'));


app.listen(63342);