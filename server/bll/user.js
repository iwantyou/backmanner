const db = require('../db');
const model = require('../model');
const async = require('async');
const _ = require('underscore');
const utils = require('../utils');
const cache = db.cache;
const sprintf = require("sprintf-js").sprintf;
const request = require('request');
const ResultInfo = require('../ResultInfo');
const setSuccess = ResultInfo.setSuccess;
const setError = ResultInfo.setError;
const ResCode = ResultInfo.ResCode;
const createToken = require('../middleware/createToken');
const Joi = require('@hapi/joi');
const config = require('../config');
const Qs = require('qs');

module.exports = {
  /**
   * @description 手机用户登录
   * @param {*} reqBody { data }
   */
  login: [async function (reqBody, { ip }, callback) {
    console.log('user.login', reqBody);
    let { data } = reqBody;
    const schema = Joi.object().keys({
      data: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    data = utils.CMBAesDecode(data);
    data = utils.parseUrl(data);
    const { UniqueUserID, RealName, MobileNo, PersonalID, Level } = data;
    const result = await db.addUser({
      level: Level, uid: PersonalID, mobile: MobileNo, idno: PersonalID, name: RealName
    });
    if (result.code == 0) {
      return callback(setSuccess({ token: createToken({ userId: result.data, ip }) }));
    }
    callback(setError(ResCode.ERR_AUTH));
  }],
  info: async function (reqBody, user, callback) {
    console.log('user.info', reqBody, user);
    let userdata = await model.User.findById(user.userId);
    let result = { name: '', mobile: '', avatar: utils.makeAvatar() };
    if (userdata) {
      userdata = userdata.toObject();
      result.name = userdata.name;
      result.phone = utils.hidePhone(userdata.mobile);
    }
    callback(setSuccess(result));
  },
};