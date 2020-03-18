var express = require("express");
var app = express();
var gedtClientIp = require("./get_ip").gedtClientIp;
var des = require("./encode").des
app.get('/backend/api/get_file_pass_token', (req, res) => {
    var ip = gedtClientIp(req);
    console.log(66666);
    console.log(ip)
    var encrypt_text = des.encrypt(new Date().getTime() + '$$'+ip+'$$123$$456$$567$$789');
    console.log(encrypt_text);
    res.send({
    //   header: req.headers,
      file_token: encrypt_text
    })
})
app.use(express.static('./public'));
app.listen(63342);