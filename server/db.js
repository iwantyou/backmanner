const async = require('async');
const _ = require('underscore');
const utils = require('./utils');
const CronJob = require('cron').CronJob;
const mongoose = require('mongoose');
const cache = require('memory-cache');
const config = require('./config');
const ResultInfo = require('./ResultInfo');
const setSuccess = ResultInfo.setSuccess;
const setError = ResultInfo.setError;
const ResCode = ResultInfo.ResCode;
const model = require('./model');
const _data = require('./data');
if (!process.env.MONGO_URL) {
  console.log('please set `MONGO_URL` environment before start the application.');
  process.exit(1);
}
// mongodb 连接🔗
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  autoReconnect: true,
  poolSize: 10,
  reconnectTries: 30,
  reconnectInterval: 500,
  bufferCommands: false,
  autoIndex: process.env.NODE_ENV == 'production' ? false : true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'));
db.once('open', function () {
  console.log('Mongodb started successfully');
  initData();
});
//添加系统用户
async function addUser(options) {
  let { level, uid, mobile, idno, name, sex } = options;
  if (utils.isCardID(uid)) {
    let idNoInfo = utils.isCardID(uid);
    sex = idNoInfo.sex;
    idno = uid;
  } else if (utils.isPhone(uid)) mobile = uid;
  else return utils.ResObj(setError(ResCode.ERR_ACCOUNT_INVALID));
  const user = new model.User({
    level, uid, mobile, idno, name, sex, state: 0
  });
  let _user = await model.User.findOne({ uid });
  if (!_user) _user = await user.save();
  else {
    await model.User.findByIdAndUpdate(_user._id, { $set: _.pick(user.toObject(), ['level', 'mobile', 'idno', 'name', 'sex', 'state']) });
  }
  return utils.ResObj({ code: 0, data: _user._id });
}
//添加账户
async function addAdmin({ mobile, name, role, password }) {
  const result = await addUser({ uid: mobile, mobile, name, });
  if (result.code == 0) {
    const userId = result.data;
    password = password || mobile.substr(5);
    const salt = utils.makeUUID();
    const admin = new model.Admin({
      userId, mobile, username: mobile, password: utils.getPwd(password, salt), salt, name, state: 0, role,
    });
    let _admin = await model.Admin.findOne({ userId });
    if (!_admin) _admin = await admin.save();
    else {
      if (_admin.state == 1) {
        await model.Admin.findByIdAndUpdate(_admin._id, { $set: _.pick(admin.toObject(), ['password', 'salt', 'name', 'state', 'role']) });
      }
    }
    return utils.ResObj({ code: 0 });
  }
  return utils.ResObj(result);
}
async function initAdmin() {
  const result = await addAdmin(config.defaultAdmin);
  console.log('addAdmin', result);
  return utils.ResObj(result);
}
async function initVote() {
  const votecount = await model.Vote.countDocuments();
  const voteId = utils.makeUUID();
  if (votecount == 0) {
    const vote = new model.Vote({
      _id: voteId,
      ..._data.vote,
    });
    const bindvote = new model.Vote({
      bindId: voteId,
      ..._data.bindvote,
    });
    await vote.save();
    await bindvote.save();
  }
  return utils.ResObj({ code: 0, voteId });
}
async function initItems(voteId) {
  const itemcount = await model.Item.countDocuments();
  if (itemcount == 0) {
    for (let i = 0; i < _data.items.length; i++) {
      const item = new model.Item({
        voteId,
        ..._data.items[i],
        linkman: '杨金龙',
        linkphone: '15378700683',
        cover: '/static/img/xuan.307f9e1.png',
        images: ['/static/img/xuan.307f9e1.png'],
        sharecount: 0,
        viewcount: 0,
        state: 0,
        createdBy: 'bd9ba582fb60447e8c66917f936945e0'
      });
      await item.save();
    }
  }
  return utils.ResObj({ code: 0 });
}
async function initData() {
  await initAdmin();
  // const { voteId } = await initVote();
  // await initItems(voteId);
}
module.exports = { cache, addUser, addAdmin };
// var job = new CronJob('0 */15 * * * *', function () {
//   try {
//     console.log('更新数据')
//     init();
//   } catch (e) {
//     console.error(e);
//   }
// }, null, true, 'Asia/Shanghai', job, false);