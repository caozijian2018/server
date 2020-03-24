var crypto = require('crypto');
var http = require("http");
global.key = 'testbirdtestbird';
global.iv = 'testbird20202020'
var cryputil = require('.');


global.response = {

    status: '401',

    statusDescription: 'Unauthorized',

};

exports.des = {



    algorithm: { aes_128_cbc: 'aes-128-cbc' },



    encrypt: function (plaintext, iv = "testbird20202020") {

        try {

            var biv = new Buffer(iv ? iv : 0);

            var cipher = crypto.createCipheriv(this.algorithm.aes_128_cbc, global.key, biv);

            cipher.setAutoPadding(true);

            var ciph = cipher.update(plaintext, 'utf8', 'hex');

            ciph += cipher.final('hex');

            return ciph;

        } catch (e) {

            return '';

        }

    },



    decrypt: function (encrypt_text, iv = "testbird20202020") {

        try {

            var bkey = new Buffer(global.key);

            var biv = new Buffer(iv ? iv : 0);

            var decipher = crypto.createDecipheriv(this.algorithm.aes_128_cbc, bkey, biv);

            decipher.setAutoPadding(true);

            var txt = decipher.update(encrypt_text, 'hex', 'utf8');

            txt += decipher.final('utf8');

            return txt;

        } catch (e) {

            return '';

        }

    }

};



exports.handler = async (event, context, callback) => {
    console.log("????????")
    const request = event.Records[0].cf.request;
    console.log(request.uri)
    console.log(JSON.stringify(request))


    const qs = request.querystring;

    const clientIp = request.clientIp;

    var querystring = require("querystring");

    var qobject = querystring.parse(qs);

    var authinfo;

    for (let key in qobject) {

        console.log('key:' + key + ', value:' + qobject[key]);

        if (key == 'AuthInfo') {
            authinfo = qobject[key];

        }

    }
    // 得到游戏arr
    var opt = {
        host: 'game-park.net',
        method: 'GET',
        path: '/backend/api/v1/get_game_arr',
    }
    var body = '';
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
            console.log(request.uri)
            console.log(JSON.stringify(request))
            var host = request.headers.host[0].value;
            console.log(host)
            var is_game = gamestr.indexOf(host) > -1;
            if (is_game) {
                if ((request.uri.indexOf("index.htm") == -1)) {
                    callback(null, request);
                    return;
                }
            }

            // 


            var decrypt_text = cryputil.des.decrypt(authinfo, iv);

            var params = decrypt_text.split('$$');

            if (params.length != 6) {

                callback(null, global.response);

                return;

            }



            var now = Date.now();

            var timestamp = 1000 * (parseInt(params[0]) + 7 * 60 * 60);

            if (timestamp < now) {

                callback(null, global.response);

                return;

            }



            if (params[1] != clientIp) {

                callback(null, global.response);

                return;

            }

            callback(null, request);
        });
    }).on('error', function (e) {
        console.log("error: " + e.message);
    })
    // req.write(data);
    req.end();
};