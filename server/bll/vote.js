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
  add: async function (reqBody, user, callback) {
    console.log('vote.add', reqBody, user);
    let { voteId, voteinfo } = reqBody;
    let { title, organizer, cover, start, end, desc, publish } = voteinfo;
    const schema = Joi.object().keys({
      title: Joi.string().required(),
      organizer: Joi.string().required(),
      cover: Joi.string().required(),
      start: Joi.number().required(),
      end: Joi.number().required(),
      desc: Joi.string().required(),
      publish: Joi.boolean().required(),
    });
    const res = Joi.validate(voteinfo, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    if (voteId) {
      await model.Vote.findByIdAndUpdate(voteId, { $set: voteinfo });
    } else {
      voteId = utils.makeUUID();
      const vote = new model.Vote({
        _id: voteId,
        title, organizer, cover, start, end, desc, state: 0, publish, self_registration: true,
        rule: config.defaultRule, createdBy: user.userId,
      });
      const bindvote = new model.Vote({
        bindId: voteId,
        title: '最佳助威人', organizer, cover, start, end, desc, state: 0, publish, self_registration: true,
        rule: config.defaultRule, createdBy: user.userId,
      });
      await vote.save();
      await bindvote.save();
    }

    callback(setSuccess());
  },
  /**
   * @description 投票活动列表
   * @param {*} reqBody { page, limit }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   * @return {*} { count: '总数据量', data: '本次查询数据', loadmore: '是否有更多数据' }
   */
  list: async function (reqBody, user, callback) {
    console.log('vote.list', reqBody, user);
    const { page, limit } = reqBody;
    const schema = Joi.object().keys({
      page: Joi.number().min(1).required(),
      limit: Joi.number().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    const where = { state: 0, publish: true, bindId: '' };
    const order = { createdAt: -1 };
    const fields = { title: 1, cover: 1, start: 1, end: 1, };
    const data = await list({ where, order, page, limit, fields });
    callback(setSuccess(data));
  },
  listforweb: async function (reqBody, user, callback) {
    console.log('vote.listforweb', reqBody, user);
    const { page, limit } = reqBody;
    const schema = Joi.object().keys({
      page: Joi.number().min(1).required(),
      limit: Joi.number().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    const where = { state: 0, publish: true, bindId: '' };
    const order = { createdAt: -1 };
    const data = await list({ where, order, page, limit });
    let voteIds = _.pluck(data.data, "_id");
    const bindvotes = await list({ where: { state: 0, bindId: { $in: voteIds } } });
    voteIds = voteIds.concat(_.pluck(bindvotes.data, "_id"));
    const items = await model.Item.find({ voteId: { $in: voteIds }, state: 0 }).select({ voteId: 1, votecount: 1 }).exec();
    data.data.forEach(vote => {
      let voteitems = _.where(items, { voteId: vote._id });
      vote.desc = utils.stringHtmlBr(vote.desc);
      vote.itemcount = voteitems.length;
      vote.votecount = _.reduce(voteitems, (a, b) => a + b.votecount, 0);
      vote.bindvote = _.findWhere(bindvotes.data, { bindId: vote._id });
      voteitems = _.where(items, { voteId: vote.bindvote._id });
      vote.bindvote.itemcount = voteitems.length;
      vote.bindvote.votecount = _.reduce(voteitems, (a, b) => a + b.votecount, 0);
    });
    callback(setSuccess(data));
  },
  /**
   * @description 投票活动信息
   * @param {*} reqBody { voteId: '活动ID' }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   * @return {*} 投票活动信息
   */
  info: async function (reqBody, user, callback) {
    console.log('vote.info', reqBody, user);
    const { voteId } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    let vote = await model.Vote.findById(voteId);
    if (!vote || vote.state != 0 || !vote.publish) return callback(setError(ResCode.ERR_OBJECTNULL));
    vote = vote.toObject();
    vote.desc = utils.stringHtmlBr(vote.desc);
    callback(setSuccess(vote));
  },
  infoweb: async function (reqBody, user, callback) {
    console.log('vote.info', reqBody, user);
    const { voteId } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    let vote = await model.Vote.findById(voteId);
    if (!vote || vote.state != 0) return callback(setError(ResCode.ERR_OBJECTNULL));
    vote = vote.toObject();
    callback(setSuccess(vote));
  },
  ruleinfo: async function (reqBody, user, callback) {
    console.log('vote.ruleinfo', reqBody, user);
    const { voteId } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    let vote = await model.Vote.findById(voteId);
    if (!vote || vote.state != 0) return callback(setError(ResCode.ERR_OBJECTNULL));
    vote = vote.toObject();
    callback(setSuccess(vote.rule || {}));
  },
  saverule: async function (reqBody, user, callback) {
    console.log('vote.saverule', reqBody, user);
    const { voteId, rule } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
      rule: Joi.object().keys({
        count: Joi.number().min(1).max(5).required(),
        rate: Joi.string().regex(/^everyteam|everyday|everyteam\+everyday|total$/),
        LV1: Joi.number().min(1).max(5).required(),
        LV2: Joi.number().min(1).max(5).required(),
        LV3: Joi.number().min(1).max(5).required(),
        LV4: Joi.number().min(1).max(5).required(),
        LV5: Joi.number().min(1).max(5).required(),
        W5: Joi.number().min(1).max(5).required(),
        W10: Joi.number().min(1).max(5).required(),
      })
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    await model.Vote.findByIdAndUpdate(voteId, { $set: { rule } });
    callback(setSuccess());
  },
};

async function list({ where, order, page, limit, fields }) {
  let query = model.Vote.find(where);
  if (fields) query = query.select(fields);
  if (page && limit) query = query.skip((page - 1) * limit).limit(limit);
  if (order) query = query.sort(order);
  const data = await query.exec();
  const count = await model.Vote.countDocuments(where);
  const loadmore = count > 0 && ((page - 1) * limit + data.length) < count;
  return utils.ResObj({ count, data: _.map(data, (n) => n.toObject()), loadmore });
}