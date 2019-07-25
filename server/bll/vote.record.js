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
   * @description 投票
   * @param {*} reqBody { voteId, itemId }
   * @param {*} user { _id: '账号ID', role: '账号角色', userId: '用户ID', level: '用户级别', ip }
   */
  add: async function (reqBody, user, callback) {
    console.log('record.add', reqBody, user);
    const { voteId, itemId } = reqBody;
    const schema = Joi.object().keys({
      voteId: Joi.string().required(),
      itemId: Joi.string().required(),
    });
    const res = Joi.validate(reqBody, schema);
    if (res.error) return callback(setError(ResCode.ERR_FORMATE));
    const vote = await model.Vote.findById(voteId, { rule: 1, start: 1, end: 1 });
    if (vote.start > Date.now()) return callback(setError(ResCode.ERR_VOTE_NOT_START));
    if (vote.end <= Date.now()) return callback(setError(ResCode.ERR_VOTE_ENDED));
    const { year, month, day, hour, minute, second } = utils.nowDateObj();
    const { voteable, votecount } = await check.checkVote({ voteId, itemId, ..._.pick(user, ['userId', 'level', 'wlevel']), ..._.pick(vote, ['rule']), year, month, day });
    if (!voteable) return callback(setError(ResCode.ERR_VOTE));
    const record = new model.Record({
      voteId, itemId, userId: user.userId,
      voteDate: `${year}-${month}-${day}`,
      voteYear: year, voteMonth: month, voteDay: day,
      voteTime: `${hour}:${minute}:${second}`,
      voteHour: hour, votecount, ip: user.ip,
    });
    //保存投票记录
    await record.save();
    //更新投票结果
    await model.Item.findByIdAndUpdate(itemId, { $inc: { votecount } });
    callback(setSuccess());
  },
};