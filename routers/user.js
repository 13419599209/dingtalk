var express = require("express")
var router = express.Router()
var co = require('co');

var httpUtil = require("../utils/httpUtil");
var auth = require('../api/auth')
var user = require('../api/user')
var processinstance = require('../api/processinstance')


//获取用户信息
router.get('/getInfoByCode', function(req, res) {
    var code = req.query.code;
    console.log('code: ' + code);
    co(function*() {
        var accessToken = (yield auth.getAccessToken())['access_token'];
        console.log('accessToken: user : ' + accessToken);

        var userer = yield user.getUserByCode({ access_token: accessToken, code: code });
        console.log("用户信息：" + JSON.stringify(userer));
        var userid = userer.userid;
        var userInfo = yield user.getUserInfo({ access_token: accessToken, userid: userid });
        console.log("用户详细信息：" + JSON.stringify(userInfo));
        var department_id = userInfo.department[0];
        console.log("部门id：" + department_id);
        var userList = yield user.getUsersBydepartmentId({ access_token: accessToken, department_id: department_id });
        console.log("部门成员信息：" + JSON.stringify(userList));
        var response = {
            userName: userInfo.name,
            accessToken: accessToken,
            userid: userid,
            departmentId: department_id
        };
        res.json(response);
        var json = {
            call_back_tag: ["bpms_task_change", "bpms_instance_change"],
            token: "123456",
            aes_key: "1122334455112233445511223344551122334455qaq",
            url: "http://192.168.1.222:3000/processinstance"
        };

        var callBackInfo = yield processinstance.registerCallBack(accessToken, json);
        console.log('callBackInfo : ' + JSON.stringify(callBackInfo));
    }).catch(function(err) {
        console.log(err);
    });

})







module.exports = router