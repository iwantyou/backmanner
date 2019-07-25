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
const check = require('../check');

module.exports = {
  /**
   * @description 报名参加投票活动
   * @param {*} reqBody { voteId, title, linkman, linkphone, images, videos, slogan }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   */
  add: async function (reqBody, user, callback) {
    console.log('item.add', reqBody, user);
    if (!reqBody.linkman) reqBody.linkman = '';
    if (!reqBody.linkphone) reqBody.linkphone = '';
    if (!reqBody.images) reqBody.images = [];
    reqBody.cover = reqBody.images[0] || '';
    if (!reqBody.videos) reqBody.videos = [];
    if (!reqBody.slogan) reqBody.slogan = '';
    const { voteId, title, linkman, linkphone, cover, images, videos, slogan } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
      title: Joi.string().min(1).max(10).required(),
      linkman: Joi.string().required(),
      linkphone: Joi.string().required(),
      cover: Joi.string().required(),
      images: Joi.array().min(0).items(Joi.string()).required(),
      videos: Joi.array().min(0).items(Joi.string()).required(),
      slogan: Joi.string().required(),
    });
    const res = Joi.validate({
      voteId, title, linkman, linkphone, cover, images, videos, slogan
    }, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    let existed = await model.Item.findOne({ voteId, title, state: { $ne: 1 } });
    if (existed) return callback(setError(ResCode.ERR_DUPLICATE_ITEM_TITLE));
    existed = await model.Item.findOne({ voteId, userId: user.userId, state: { $ne: 1 } });
    if (existed) return callback(setError(ResCode.ERR_DUPLICATE_ITEM));
    const vote = await model.Vote.findById(voteId);
    if (!vote.self_registration) return callback(setError(ResCode.ERR_VOTE_SELF_REGISTRATION));
    const item = new model.Item({
      voteId, userId: user.userId, title, linkman, linkphone, cover, images, videos, slogan, votecount: 0, sharecount: 0, viewcount: 0,
      state: -1, createdBy: user.userId,
    });
    const itemId = (await item.save())._id;;
    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      await model.File.updateOne({ url: image }, { $set: { voteId, itemId } });
    }
    for (let i = 0; i < videos.length; i++) {
      let video = videos[i];
      await model.File.updateOne({ url: video }, { $set: { voteId, itemId } });
    }
    callback(setSuccess());
  },
  /**
   * @description 投票项目列表
   * @param {*} reqBody { voteId, page, limit }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   * @return {*} { count: '总数据量', data: '本次查询数据', loadmore: '是否有更多数据' }
   */
  listforweb: async function (reqBody, user, callback) {
    console.log('item.listforweb', reqBody, user);
    const { voteId, page, limit } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string(),
      page: Joi.number().min(1).required(),
      limit: Joi.number().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    const where = { state: { $ne: 1 } };
    if (voteId) where.voteId = voteId;
    const order = { createdAt: -1 };
    const data = await list({ where, order, page, limit });
    callback(setSuccess(data));
  },
  /**
   * @description 按得票数排名
   * @param {*} reqBody
   * @param {*} user
   * @param {*} callback
   */
  listbyvotecount: async function (reqBody, user, callback) {
    console.log('item.listbyvotecount', reqBody, user);
    const { voteId } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    const where = { voteId, state: 0 };
    const order = { votecount: -1 };
    const fields = { voteId: 1, title: 1, cover: 1, votecount: 1, };
    const data = await list({ where, order, fields });
    if (data.data.length > 0) {
      const items = [];
      const itemIds = _.pluck(data.data, "_id");
      const records = await model.Record.find({ itemId: { $in: itemIds }, userId: user.userId }).select({ itemId: 1, year: 1, month: 1, day: 1 }).exec();
      const { year, month, day } = utils.nowDateObj();
      const vote = await model.Vote.findById(voteId, { rule: 1 });
      for (let i = 0; i < data.data.length; i++) {
        let item = data.data[i];
        let voted = false;
        if (vote.rule.rate == 'total') {
          voted = records.length >= vote.rule.count;
        } else if (vote.rule.rate == 'everyday') {
          voted = _.where(records, { year, month, day }).length >= vote.rule.count;
        } else if (vote.rule.rate == 'everyteam+everyday') {
          voted = _.where(records, { itemId: item._id, year, month, day }).length >= vote.rule.count;
        }
        items.push({ ...item, voted, votable: !voted, });
      }
      data.data = items;
    }
    callback(setSuccess(data));
  },
  /**
   * @description 投票项目信息
   * @param {*} reqBody { itemId: '项目ID' }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   * @return {*} 投票信息
   */
  info: async function (reqBody, user, callback) {
    console.log('item.info', reqBody, user);
    const { itemId } = reqBody;
    const schema = Joi.object().keys({
      itemId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    let item = await model.Item.findById(itemId);
    if (!item || item.state != 0) return callback(setError(ResCode.ERR_OBJECTNULL));
    item = item.toObject();
    const vote = await model.Vote.findById(item.voteId, { start: 1, end: 1, bindId: 1, self_registration: 1, rule: 1 });
    _.extend(item, _.pick(vote, ['start', 'end', 'bindId', 'self_registration']));
    const { year, month, day } = utils.nowDateObj();
    const { voteable } = await check.checkVote({ voteId: item.voteId, itemId, ..._.pick(user, ['userId', 'level', 'wlevel']), ..._.pick(vote, ['rule']), year, month, day });
    item.votable = voteable;
    item.voted = !voteable;
    callback(setSuccess(item));
  },
  /**
   * @description 我的报名
   * @param {*} user
   */
  my: async function (reqBody, user, callback) {
    console.log('item.voted', reqBody, user);
    const where = { userId: user.userId };
    const order = { createdAt: -1 };
    const fields = { voteId: 1, title: 1, cover: 1, votecount: 1, state: 1 };
    const data = await list({ where, order, fields });
    if (data.data.length > 0) {
      const voteIds = _.uniq(_.pluck(data.data, "voteId"));
      const votes = await model.Vote.find({ _id: { $in: voteIds } }).select({ start: 1, end: 1 }).exec();
      data.data.forEach(item => {
        _.extend(item, _.pick(_.findWhere(votes, { _id: item.voteId }), ['start', 'end']));
      });
    }
    callback(setSuccess(data.data));
  },
  /**
   * @description 我的点赞
   * @param {*} user
   */
  voted: async function (reqBody, user, callback) {
    console.log('item.voted', reqBody, user);
    let records = await model.Record.find({ userId: user.userId }).select({ itemId: 1 }).exec();
    let itemIds = _.uniq(_.pluck(records, 'itemId'));
    console.log(itemIds);
    const where = { _id: { $in: itemIds }, state: 0 };
    const fields = { voteId: 1, title: 1, cover: 1, votecount: 1, };
    const data = await list({ where, fields });
    if (data.data.length > 0) {
      const items = [];
      itemIds = _.pluck(data.data, "_id");
      records = await model.Record.find({ itemId: { $in: itemIds }, userId: user.userId }).select({ voteId: 1, itemId: 1, year: 1, month: 1, day: 1 }).exec();
      const voteIds = _.uniq(_.pluck(records, "voteId"));
      const { year, month, day } = utils.nowDateObj();
      const votes = await model.Vote.find({ _id: { $in: voteIds } }).select({ rule: 1 }).exec();
      for (let i = 0; i < data.data.length; i++) {
        let item = data.data[i];
        let vote = _.findWhere(votes, { _id: item.voteId });
        let voted = false;
        if (vote.rule.rate == 'total') {
          voted = records.length >= vote.rule.count;
        } else if (vote.rule.rate == 'everyday') {
          voted = _.where(records, { year, month, day }).length >= vote.rule.count;
        } else if (vote.rule.rate == 'everyteam+everyday') {
          voted = _.where(records, { itemId: item._id, year, month, day }).length >= vote.rule.count;
        }
        items.push({ ...item, voted, votable: !voted, });
      }
      data.data = items;
    }
    callback(setSuccess(data.data));
  },
  pass: async function (reqBody, user, callback) {
    console.log('item.pass', reqBody, user);
    const { itemId } = reqBody;
    const schema = Joi.object().keys({
      itemId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    await model.Item.findByIdAndUpdate(itemId, { $set: { state: 0, passBy: user.userId, passTime: new Date() } });
    callback(setSuccess());
  },
  reject: async function (reqBody, user, callback) {
    console.log('item.reject', reqBody, user);
    const { itemId } = reqBody;
    const schema = Joi.object().keys({
      itemId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    await model.Item.findByIdAndUpdate(itemId, { $set: { state: 1, rejectBy: user.userId, rejectTime: new Date() } });
    callback(setSuccess());
  },
};

async function list({ where, order, page, limit, fields }) {
  let query = model.Item.find(where);
  if (fields) query = query.select(fields);
  if (page && limit) query = query.skip((page - 1) * limit).limit(limit);
  if (order) query = query.sort(order);
  const data = await query.exec();
  const count = await model.Item.countDocuments(where);
  const loadmore = count > 0 && ((page - 1) * limit + data.length) < count;
  return utils.ResObj({ count, data: _.map(data, (n) => n.toObject()), loadmore });
}