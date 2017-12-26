var express = require("express")
var router = express.Router()
var co = require('co');

var httpUtil = require("../utils/httpUtil")
var auth = require('../api/auth')

const corpId = require('../env').corpid
const corpsecret = require('../env').corpsecret
var params = {
    corpid: corpId,
    corpsecret: corpsecret
}

router.get('/', function(req, res) {
    var nonceStr = 'abcdefg';
    var timeStamp = new Date().getTime();
    var signedUrl = 'http://192.168.1.222:3000/index';
    co(function*() {
        var _config = yield auth.getDDConfig(signedUrl);
        console.log("_config: " + JSON.stringify(_config));
        res.render('index', {
            _config: JSON.stringify(_config)
        });
    }).catch(function(err) {
        console.log(err);
    });


})

module.exports = router