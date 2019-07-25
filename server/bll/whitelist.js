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

module.exports = {
  /**
   * @description 白名单列表
   * @param {*} reqBody { voteId, page, limit }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   * @return {*} { count: '总数据量', data: '本次查询数据', loadmore: '是否有更多数据' }
   */
  list: async function (reqBody, user, callback) {
    console.log('whitelist.list', reqBody, user);
    const { voteId, page, limit } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
      page: Joi.number().min(1).required(),
      limit: Joi.number().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    const where = { voteId, state: 0 };
    const order = { createdAt: -1 };
    const fields = { phone: 1, idno: 1, name: 1, birth: 1, };
    const data = await list({ where, order, page, limit, fields });
    data.data.forEach(item => {
      item.phone = utils.hidePhone(item.phone);
      item.idno = utils.hideID(item.idno);
    });
    callback(setSuccess(data));
  },
  remove: async function (reqBody, user, callback) {
    console.log('whitelist.remove', reqBody, user);
    const { _id } = reqBody;
    const schema = Joi.object().keys({
      _id: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    await model.WhiteList.findByIdAndUpdate(_id, { $set: { state: 1, removeBy: user.userId, removeTime: new Date() } });
    callback(setSuccess());
  },
  /**
   * @description 添加白名单
   * @param {*} reqBody { voteId, name, phone, idno, birth }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   */
  add: async function (reqBody, user, callback) {
    console.log('whitelist.add', reqBody, user);
    const { voteId, name, phone, idno, birth } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
      name: Joi.string().required(),
      phone: Joi.string().required(),
      idno: Joi.string().required(),
      birth: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    add(user.userId, { voteId, name, phone, idno, birth });
    callback(setSuccess());
  },
  /**
   * @description 批量导入白名单
   * @param {*} reqBody { voteId, data: [{ name, phone, idno, birth }] }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   */
  addbatch: async function (reqBody, user, callback) {
    console.log('whitelist.addbatch', reqBody, user);
    const { voteId, data } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
      data: Joi.array().min(1).items(Joi.object().keys({
        name: Joi.string().required(),
        phone: Joi.string().required(),
        idno: Joi.string().required(),
        birth: Joi.string().regex(/^\d{4}\-\d{1,2}\-\d{1,2}$/),
      })).required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      add(user.userId, { voteId, ...item });
    }
    callback(setSuccess());
  },
};

async function add(userId, { voteId, name, phone, idno, birth }) {
  let wid = '';
  let idNoInfo = utils.isCardID(idno);
  if (idNoInfo) {
    wid = idno;
    birth = idNoInfo.birth;
  } else if (utils.isPhone) {
    wid = phone;
  }
  const existed = model.WhiteList.findOne({ wid }, { state: 1 });
  if (existed) {
    if (existed.state == 1) {
      await model.WhiteList.updateOne({ _id: existed._id }, {
        $set: {
          name, birth, phone, idno, state: 0, createdBy: userId,
        }
      });
    }
  } else {
    const whitelist = new model.WhiteList({
      voteId, wid, name, phone, idno, birth, state: 0, createdBy: userId,
    });
    await whitelist.save();
  }
}

async function list({ where, order, page, limit, fields }, ) {
  let query = model.WhiteList.find(where);
  if (fields) query = query.select(fields);
  if (page && limit) query = query.skip((page - 1) * limit).limit(limit);
  if (order) query = query.sort(order);
  const data = await query.exec();
  const count = await model.WhiteList.countDocuments(where);
  const loadmore = count > 0 && ((page - 1) * limit + data.length) < count;
  return utils.ResObj({ count, data: _.map(data, (n) => n.toObject()), loadmore });
}