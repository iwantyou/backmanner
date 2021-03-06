// 监测 token 是否过期
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const config = require('../config');
const ResultInfo = require('../ResultInfo');
const setSuccess = ResultInfo.setSuccess;
const setError = ResultInfo.setError;
const ResCode = ResultInfo.ResCode;
const model = require('../model');
const utils = require('../utils');

module.exports = async function (req, callback) {
  let token = (req.headers['authorization'] || "").split(' ')[1];
  const result = {};
  const ip = utils.getClientIp(req);
  try {
    token = utils.AesDecode(token, config.key);
    const decoded = jwt.verify(token, config.jwt_secret);
    let { _id, userId } = decoded;
    let admin = null, user = null;
    if (_id) {
      admin = await model.Admin.findById(_id);
      if (admin && admin.state == 0) {
        _.extend(result, {
          _id: admin._id,
          role: admin.role,
        });
        userId = admin.userId;
      }
    }
    if (userId) {
      user = await model.User.findById(userId);
      if (user && user.state == 0) {
        _.extend(result, {
          userId: user._id,
          mobile: user.mobile,
          level: user.level,
        });
        const wls = await model.WhiteList.find({ wid: { $in: [user.mobile, user.idno] } }).select({ level: 1 }).exec();
        wls.forEach(wl => {
          if (config.w_level[wl.level] > result.wlevel) result.wlevel = wl.level;
        });
      }
    }
    if (ip == decoded.ip) {
      _.extend(result, { ip });
      return callback(setSuccess(result));
    }
    //TODO 上线前替换
    // return callback(setSuccess(result));
    return callback(setError(ResCode.ERR_TOKEN));
  } catch (err) {
    console.error(err);
    if (err.name === 'TokenExpiredError') {//token过期
      //TODO 上线前替换
      // return callback(setSuccess(result));
      return callback(setError(ResCode.ERR_TOKEN));
    } else {
      //TODO 上线前替换
      // return callback(setSuccess(result));
      return callback(setError(ResCode.ERR_TOKEN));
    }
  }
}
