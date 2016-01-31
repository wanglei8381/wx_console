var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var hbs = require('hbs');
//扩展hbs功能
require('./hbs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var config = require('./config');
var router = require('./router');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
/*app.set('view engine', 'html');
 app.engine('html', hbs.__express);*/
//局部模板
hbs.registerPartials(__dirname + '/views/partials');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

//处理请求数据
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
app.use(bodyParser.raw({limit: '1mb'}));

//开启cookie
app.use(cookieParser(config.session_secret));
//开启session
app.use(session({
  secret: config.session_secret,
  name: 'APPCAN_SESSION',
  cookie: {
    maxAge: 1000 * 60 * 30
  }, //session设置30分钟
  resave: false,
  saveUninitialized: true,
}));

//配置路由
app.use(router);

//启动服务
app.listen(config.port);