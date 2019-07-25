const mongoose = require('mongoose');
const utils = require('../utils');

const TName = "cmb.admin"; //表名

const adminSchema = new mongoose.Schema(
  {
    _id: { type: String, default: utils.uniqid }, //账户ID
    userId: { type: String, unique: true }, //用户ID
    mobile: { type: String, unique: true }, //手机号
    username: { type: String, unique: true },//登录账号
    password: String, //密码
    salt: String, //密码混淆
    name: String, //姓名
    state: { type: Number, index: true }, //状态 0:正常 1:无效
    role: { type: String, index: true }, //角色 0:普管 1:超管
    createdAt: { type: Date, default: utils.nowDate }, //创建时间
  },
  { versionKey: false, collection: TName, strict: false }
);
const Admin = mongoose.model(TName, adminSchema);

module.exports = {
  Admin,
};