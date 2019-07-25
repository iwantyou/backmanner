const mongoose = require('mongoose');
const utils = require('../utils');

const TName = "cmb.users"; //表名

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: utils.uniqid }, //用户ID
    uid: { type: String, unique: true }, //手机号 或者 身份证号
    level: { type: String, index: true }, //用户级别 LV1:普卡 LV2:金卡 LV3:金葵花 LV4:钻石卡 LV5:私人银行
    mobile: { type: String, index: true }, //手机号
    idno: { type: String, index: true }, //身份证号
    name: String, //姓名
    sex: { type: String, default: '0' }, //性别
    state: { type: Number, index: true }, //状态 0:正常 1:无效
    createdAt: { type: Date, default: utils.nowDate }, //创建时间
  },
  { versionKey: false, collection: TName, strict: false }
);
const User = mongoose.model(TName, userSchema);

module.exports = {
  User,
};