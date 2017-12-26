var express = require("express")
var app = express()
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
//模板所在路径
app.set('views', path.join(__dirname, 'views'));
//用hbs作为模板引擎
app.set('view engine', 'hbs');




app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.use('/index', require('./routers/index'))
app.use('/user', require('./routers/user'))
app.use('/processinstance', require('./routers/processinstance'))


var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})