var crypto = require('crypto');
var config = require('../config');
var util = require('../util');
var getBody = require('raw-body');
var token = config.token;

var wx = module.exports = function (req, res, next) {
  console.log('进入wx controller...');
  if (req.method === 'POST') {
    getBody(req, {
      limit: '1mb',
      length: req.headers['content-length'],
      encoding: 'utf8'
    }, function (err, buf) {
      if (err) return next(err);
      req.body = buf;
      next();
    });
  } else {
    next();
  }

};

//网关验证
wx.gateway = function (req, res) {

  var signature = req.query.signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  var params = [];
  params.push(token, timestamp, nonce);
  params.sort();

  var tmpStr = params.join('');
  var sha1 = crypto.createHash('sha1');
  sha1.update(tmpStr);
  tmpStr = sha1.digest('hex');
  if (tmpStr === signature) {
    res.end(echostr);
  } else {
    res.end('error');
  }
};

//消息
wx.message = function (req, res) {
  console.log('微信发送原生的消息', req.body);
  util.parseJson(req.body, function (err, ret) {
    if (err) {
      //console.log('解析微信原生消息失败：', err.stack);
      return res.end('fail');
    }
    var FromUserName = ret.FromUserName;
    var ToUserName = ret.ToUserName;
    ret.FromUserName = ToUserName;
    ret.ToUserName = FromUserName;
    ret.Content = '你发送的消息' + ret.Content;

    var resStr = util.parseXml(ret);

    console.log('回应的信息：', resStr);
    res.end(resStr);

  });

};

