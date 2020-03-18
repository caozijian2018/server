var express = require("express");
var app = express();
var des = require("./encode").des
app.get('/get_pass_token', (req, res) => {
    console.log(req)
    var encrypt_text = des.encrypt('1583313594157$$64.64.234.45$$123$$456$$567$$789');
    console.log(66666);
    console.log(encrypt_text);
    res.send({
      header: req.headers,
      ririri: encrypt_text
    })
})
app.use(express.static('./public'));
app.listen(63342);