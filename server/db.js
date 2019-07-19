var async = require('async');
var _ = require('underscore');
var utils = require('./utils');
var CronJob = require('cron').CronJob;
var mongoose = require('mongoose');
var cache = require('memory-cache');
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
});
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'));
db.once('open', function () {
  console.log('Mongodb started successfully');
  init();
});

function uniqid() {
  return utils.makeUUID();
}
function nowTime() {
  return Date.now();
}
function nowDate() {
  return new Date();
}
var testSchema = new mongoose.Schema({ _id: { type: String, default: uniqid }, type: { type: String, index: true }, state: Number }, { versionKey: false, collection: 'test' });
testSchema.index({ state: 1 });

var model = {
  Test: mongoose.model('test', testSchema),
};
function init() {
  async.auto({

  }, function (err, results) {
    if (!err) {

    }
  });
}
module.exports = { mongoose, cache, model };
// var job = new CronJob('0 */15 * * * *', function () {
//   try {
//     console.log('更新数据')
//     init();
//   } catch (e) {
//     console.error(e);
//   }
// }, null, true, 'Asia/Shanghai', job, false);