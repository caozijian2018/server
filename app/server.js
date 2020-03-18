var express = require("express");
var app = express();
var static = express.static("public");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use("/static", static);
var setting = require('./util');
var base = setting.base;
// 测试请求
app.post('/backendd/get_HEADER', (req, res) => {
  console.log(req)
  res.send({
    header: req.headers
  })
  // res.render('index_post.html')
})

app.get('/backendd/get_HEADER', (req, res) => {
  console.log(req)
  res.send({
    header: req.headers
  })
})
// 请求anti v3
//{
//   "clientKey":"dce6bcbb1a728ea8d871de6d169a2057",
//   "task":
//       {
//           "type":"RecaptchaV3TaskProxyless",
//           "websiteURL":"http:\/\/mywebsite.com\/recaptcha\/test.php",
//           "websiteKey":"6Lc_aCMTAAAAABx7u2N0D1XnVbI_v6ZdbM6rYf16",
//           "minScore": 0.3,
//           "pageAction": "myverify"
//       }
// }
app.get('/gettoken', (req, res) => {
  console.log(req)
  res.send({
    header: req.headers
  })
})
//
app.all(`/${base}/:url`, (req, res) => {
  var url = req.params.url;
  if (url == "infosetting") {
    console.log("INFOSETTING");
    console.log(req);
  }
  var collection_name = setting.url_2_colletion_url[url];
  switch (req.method) {
    case "GET":
      (() => {
        var params = req.query;
        var page = params.page ? --params.page : 0;
        var sort = {};
        var sortBy = params.sortBy;
        var adorder = params.adorder;
        if (sortBy && adorder) {
          sort.sortBy = adorder;
        }
        var pageamount = params.pageamount || Math.max();
        var url_path = req.params.url;
        var query;
        if (url_path == "single_infosetting") {
          query = {
            _id: ObjectId(params._id)
          }
        } else {
          //因为是get请求所以都是在？query里的 怎么封装得更好呢 
          delete params.page;
          delete params.sortBy;
          delete params.pageamount;
          query = params || {};
        }
        db.find(collection_name, query, {
          page,
          pageamount,
          sort
        }, (err, data) => {
          res.set("Content-Type", "text/json");
          db.count(collection_name, query, count => {
            res.send({
              data,
              code: "200",
              count
            });
          });
        });
      })();
      break;
    case "POST":
      (() => {
        var params = req.body;
        var prod_obj = params;
        db.insert(collection_name, prod_obj, (err, data) => {
          res.send({
            data,
            code: "200"
          });
        });
      })();
      break;
    case "DELETE":
      (() => {
        var params = req.body;
        var _id = ObjectId(params._id);
        db.delete_(collection_name, {
          _id
        }, (err, data) => {
          res.send({
            data,
            code: "200"
          });
        });
      })();
      break;
    case "PATCH":
      (() => {
        var params = req.body;
        var _id = ObjectId(params._id);
        delete params._id;
        db.patch(collection_name, {
          _id
        }, params, (err, data) => {
          res.send({
            data,
            code: "200"
          });
        });
      })();
      break;
  }
});


app.listen(3000);