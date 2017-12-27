var express = require("express")
var router = express.Router()
var bodyParser = require('body-parser')

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var co = require('co');

var httpUtil = require("../utils/httpUtil");
var auth = require('../api/auth')
var user = require('../api/user')

const corpId = require('../env').corpid
const corpsecret = require('../env').corpsecret
const ssoSecret = require('../env').ssoSecret
var params = {
    corpid: corpId,
    corpsecret: corpsecret
}

router.post('/', urlencodedParser, function(req, res) {
    console.log("post注册回调的url")
})

router.get('/', function(req, res) {
    console.log("get注册回调的url")
})

module.exports = router