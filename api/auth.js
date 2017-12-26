var crypto = require('crypto');
var co = require('co');
var url = require('url');

var httpUtil = require("../utils/httpUtil");

const corpId = require('../env').corpid
const corpsecret = require('../env').corpsecret
const ssoSecret = require('../env').ssoSecret
var params = {
    corpid: corpId,
    corpsecret: corpsecret
}

var auth = {
    getAccessToken: function() {
        return httpUtil.get('/gettoken', params);
    },

    getTicket: function(accessToken) {
        return httpUtil.get('/get_jsapi_ticket', { type: 'jsapi', access_token: accessToken })
    },
    getDDConfig: function(signedUrl) {
        return co(function*() {
            var nonceStr = 'abcdefg';
            var timeStamp = new Date().getTime();
            var accessToken = (yield auth.getAccessToken())['access_token'];
            //console.log('accessToken: ' + accessToken);
            var ticket = (yield auth.getTicket(accessToken))['ticket'];
            //console.log('ticket: ' + ticket);
            var signature = auth.sign({
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                url: signedUrl,
                ticket: ticket
            });
            return {
                signature: signature,
                nonceStr: nonceStr,
                timeStamp: timeStamp,
                corpId: corpId
            };
        }).catch(function(err) {
            console.log(err);
        });
    },
    sign: function(params) {
        var origUrl = params.url;
        var origUrlObj = url.parse(origUrl);
        delete origUrlObj['hash'];
        var newUrl = url.format(origUrlObj);
        var plain = 'jsapi_ticket=' + params.ticket +
            '&noncestr=' + params.nonceStr +
            '&timestamp=' + params.timeStamp +
            '&url=' + newUrl;

        console.log(plain);
        var sha1 = crypto.createHash('sha1');
        sha1.update(plain, 'utf8');
        var signature = sha1.digest('hex');
        console.log('signature: ' + signature);
        return signature;
    }
}

module.exports = auth