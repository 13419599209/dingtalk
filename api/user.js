var httpUtil = require("../utils/httpUtil");

var user = {
    getUserByCode: function(params) {
        return httpUtil.get('/user/getuserinfo', params);
    },
    getUserInfo: function(params) {
        return httpUtil.get('/user/get', params);
    },
    getUsersBydepartmentId: function(params) {
        return httpUtil.get('/user/simplelist', params);
    }
}

module.exports = user