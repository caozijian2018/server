var crypto = require('crypto');

global.key = 'testbirdtestbird';
global.iv = 'testbird20202020'

global.response = {

    status: '401',

    statusDescription: 'Unauthorized',

};

exports.des = {



    algorithm: { aes_128_cbc: 'aes-128-cbc' },



    encrypt: function(plaintext, iv="testbird20202020")

    {

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



    decrypt: function(encrypt_text, iv="testbird20202020")

    {

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



exports.handler = async(event, context, callback) => {
    const request = event.Records[0].cf.request;
    

    const qs = request.querystring;

    const clientIp = request.clientIp;



    //console.log(qs);

    //console.log(request);

    console.log("77777777")
    console.log(event)
    console.log(context)


    var querystring = require("querystring");

    var qobject = querystring.parse(qs);

    //console.log(qobject);



    var authinfo;
    var web_tpye;
    for (let key in qobject)

    {

        //console.log('key:' + key + ', value:' + qobject[key]);

        if (key == 'AuthInfo')

        {

            authinfo = qobject[key];

            //console.log('found key[authinfo]:' + authinfo);

        }else if(key == 'web_type'){
            web_tpye = qobject[key] || "game";

        }

    }

    if( web_tpye == 'game' ){
         if(!( request.indexOf("index.html") > -1 ||  request.indexOf("index.htm") > -1)){
            callback(null, request);
            return;
        }
    }else if(web_tpye == 'video'){
        if( !( request.indexOf(".mp4") > -1 )){
            callback(null, request);
            return;
        }
    }
   
    // 
    var cryputil = require('.');

    //var encrypt_text = cryputil.des.encrypt('*****', 0);

    //console.log('test enc:' + encrypt_text);

    var decrypt_text = cryputil.des.decrypt(authinfo, iv);

    //console.log(decrypt_text);



    var params = decrypt_text.split('$$');

    //console.log(params);

    //console.log('array size:' + params.length);

    if (params.length != 6)

    {

        callback(null, global.response);

        return;

    }



    var now = Date.now();

    var timestamp = 1000 * (parseInt(params[0]) + 7 * 60 * 60);

    //console.log(timestamp + ':' + now);

    if (timestamp < now)

    {

        callback(null, global.response);

        return;

    }



    if (params[1] != clientIp)

    {

        callback(null, global.response);

        return;

    }



    //console.log(request);

    callback(null, request);

};