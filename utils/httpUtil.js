var https = require("https")
var querystring = require('querystring');

const OAPI_HOST = 'https://oapi.dingtalk.com';

var httpUtil = {
    get: function(path, params) {
        return function(cb) {
            https.get(OAPI_HOST + path + '?' + querystring.stringify(params), function(res) {
                if (res.statusCode === 200) {
                    var body = '';
                    res.on('data', function(data) {
                        body += data;
                    }).on('end', function() {
                        var result = JSON.parse(body);
                        if (result && 0 === result.errcode) {
                            cb(null, result);
                        } else {
                            cb(result);
                        }
                    });
                } else {
                    cb(new Error(response.statusCode));
                }
            }).on('error', function(e) {
                cb(e);
            });
        }
    },
    post: function(path, data) {
        return function(cb) {
            var opt = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                host: 'oapi.dingtalk.com',
                path: path,
            };
            var req = https.request(opt, function(response) {
                if (response.statusCode === 200) {
                    var body = '';
                    response.on('data', function(data) {
                        body += data;
                    }).on('end', function() {
                        var result = JSON.parse(body);
                        if (result && 0 === result.errcode) {
                            cb(null, result);
                        } else {
                            cb(result);
                        }
                    });
                } else {
                    console.log('response.statusCode: ' + response.statusCode)
                    cb.error(response.statusCode);
                }
            });
            req.write(data + '\n');
            req.end();
        }
    }
}

module.exports = httpUtil;