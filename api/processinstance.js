var httpUtil = require("../utils/httpUtil");
var querystring = require('querystring');


var processinstance = {
    registerCallBack: function(accessToken, params) {
        var path = '/call_back/register_call_back?' + querystring.stringify({ access_token: accessToken });
        return httpUtil.post(path, JSON.stringify(params));
    },
}

module.exports = processinstance