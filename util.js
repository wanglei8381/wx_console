var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var Builder = xml2js.Builder;

//文档：http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html

//处理消息xml转json
exports.parseJson = function (body, callback) {
  parseString(body, function (err, result) {
    try {
      var ret = {};
      if (!err) {
        var xml = result.xml;
        //开发者微信号
        ret.ToUserName = xml.ToUserName[0];
        //发送方帐号（一个OpenID）
        ret.FromUserName = xml.FromUserName[0];
        //消息创建时间 （整型）
        ret.CreateTime = xml.CreateTime[0];
        //消息类型,文本:text,图片:image,语音:voice,视频:video,小视频:shortvideo,地理位置:location,链接:link
        ret.MsgType = xml.MsgType[0];
        switch (ret.MsgType) {
          case 'text':
            //文本消息内容
            ret.Content = xml.Content[0];
            break;
          case 'image':
            //图片消息内容
            ret.PicUrl = xml.PicUrl[0];
            ret.MsgIdediaId = xml.MediaId[0];
            break;
          case 'voice':
            //语音消息内容
            ret.MediaId = xml.MediaId[0];
            ret.Format = xml.Format[0];
            break;
          case 'video':
          case 'shortvideo':
            //视频消息内容
            ret.MediaId = xml.MediaId[0];
            ret.ThumbMediaId = xml.ThumbMediaId[0];
            break;
          case 'location':
            //地理位置消息内容
            ret.Location_X = xml.Location_X[0];
            ret.Location_Y = xml.Location_Y[0];
            ret.Scale = xml.Scale[0];
            ret.Label = xml.Label[0];
            break;
          case 'link':
            //链接消息内容
            ret.Title = xml.Title[0];
            ret.Description = xml.Description[0];
            ret.Url = xml.Url[0];
            break;
          default :
            throw new Error('消息类型不匹配');
        }

        //消息id，64位整型
        ret.MsgId = xml.MsgId[0];
      }
      callback(err, ret);
    } catch (e) {
      console.error('解析消息信息出错了：', e.stack);
      callback(e);
    }
  });
};


//返回消息json转xml
exports.parseXml = function (ret) {

  var builder = new Builder();
  return builder.buildObject({xml: ret});
};

