var express = require("express");
var app = express();
var gedtClientIp = require("./get_ip").gedtClientIp;
var des = require("./encode").des
app.get('/backend/api/get_file_pass_token', (req, res) => {
    var ip = gedtClientIp(req).split("ffff:")[1];
    console.log(66666);
    console.log(ip)
    var Timestamp = new Date().getTime();
    var encrypt_text = des.encrypt(Timestamp + '$$'+ip+'$$123$$456$$567$$789');
    var decrypt_text = des.decrypt(encrypt_text)
    console.log(encrypt_text);
    res.send({
    //   req,
      Timestamp,
      ip,
      file_token: encrypt_text,
      decrypt_text
    })
})
app.use(express.static('./public'));
app.listen(63342, "0.0.0.0");