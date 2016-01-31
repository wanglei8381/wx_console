var express = require('express');
var routeMap = require('./controller');
var router = express.Router();

router.use(function (req, res, next) {
  console.log('请求：', req.method, req.originalUrl);
  next();
});

//微信拦截器
router.use('/wx', routeMap.wx);

//微信验证
router.get('/wx/gateway', routeMap.wx.gateway);

//消息
router.post('/wx/gateway', routeMap.wx.message);

module.exports = router;