var express = require("express");
var app = express();

 

app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  // res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

  //
  res.header('Content-Security-Policy', "default-src 'self'");
  res.header("X-Frame-Options", "SAMEORIGIN");
  res.header("X-Content-Type-Options", "nosniff");
  res.header("Referrer-Policy", "strict-origin-when-cross-origin");
  res.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.header("Feature-Policy", "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'");
  res.header("Access-Control-Allow-Origin", "*");

  //

    // resp.headers.set('Content-Security-Policy', "default-src 'self'")
    // resp.headers.set('X-Frame-Options', 'SAMEORIGIN')
    // resp.headers.set('X-Content-Type-Options', 'nosniff')
    // resp.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    // resp.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    // resp.headers.set('Feature-Policy', "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'")
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});
app.use(express.static('./public'));
app.listen(63343);