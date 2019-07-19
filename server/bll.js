var model = require('./db').model;
var async = require('async');
var _ = require('underscore');
var utils = require('./utils');
var cache = require('./db').cache;
const sprintf = require("sprintf-js").sprintf;
var request = require('request');
var matchId = '4D3eCwSBJxz4McPgB';
var gameId = '055565ff8ba148e8844d4f16ceff8a6b';
var subId = 'KM9GoyXXAnPwHJKaz';
module.exports = {
  f1: function (reqBody, user, callback) {
    callback(null, { code: 0, data: {}, msg: '成功' });
  },
  f2: [function (reqBody, callback) {
    callback(null, { code: 0, data: {}, msg: '成功' });
  }],
};