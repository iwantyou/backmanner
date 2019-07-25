const mongoose = require('mongoose');
const utils = require('../utils');

const TName = "cmb.vote"; //表名

const voteSchema = new mongoose.Schema(
  {
    _id: { type: String, default: utils.uniqid }, //账户ID
    bindId: String, //关联活动ID
    title: String, //活动标题
    cover: String, //活动封面
    start: Number, //开始时间
    end: Number, //结束时间
    organizer: String, //主办方
    desc: String, //规则介绍 可以是富文本
    rule: Object, //投票规则
    state: { type: Number, index: true }, //状态 0:正常 1:无效
    publish: { type: Boolean, index: true }, //发布状态 false:未发布 true:已发布
    self_registration: { type: Boolean, default: true },// 是否开启自主报名
    createdAt: { type: Date, default: utils.nowDate }, //创建时间
    createdBy: String, //创建者ID
  },
  { versionKey: false, collection: TName, strict: false }
);
const Vote = mongoose.model(TName, voteSchema);

module.exports = {
  Vote,
};