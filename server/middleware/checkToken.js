// 监测 token 是否过期
const jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function (req, callback) {
  // return callback({ code: 0, data: { userid: '0' } });
  // console.log(req.headers);
  let token = (req.headers['authorization'] || "").split(' ')[1];
  // 解构 token，生成一个对象 { name: xx, iat: xx, exp: xx }
  jwt.verify(token, config.jwt_secret, function (err, decoded) {
    if (!err) {
      console.log(decoded);
      callback({ code: 0, data: decoded });
    } else {
      console.error(err);
      if (err.name === 'TokenExpiredError') {//token过期
        callback({
          code: 1,
          msg: 'token过期，请重新登录'
        });
      } else {
        callback({
          code: 1,
          msg: 'token无效，请重新登录'
        });
      }
    }
  });
}
