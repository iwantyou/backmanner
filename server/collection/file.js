const mongoose = require('mongoose');
const utils = require('../utils');

const TName = "cmb.files"; //表名

const fileSchema = new mongoose.Schema(
  {
    _id: { type: String, default: utils.uniqid }, //账户ID
    filename: { type: String, index: true },//文件名
    originalname: String,//原始文件名
    mimetype: String,//文件类型
    url: { type: String, index: true },//文件路径
    path: String,//文件存储位置
    size: Number,//文件大小
    ip: String,//上传ip
    voteId: { type: String, index: true },//活动ID
    itemId: { type: String, index: true },//项目ID
    createdAt: { type: Date, default: utils.nowDate }, //上传时间
    createdBy: String, //创建者ID
  },
  { versionKey: false, collection: TName, strict: false }
);
const File = mongoose.model(TName, fileSchema);

module.exports = {
  File,
};