const user = require('./user');
const admin = require('./admin');
const vote = require('./vote');
const item = require('./vote.item');
const record = require('./vote.record');
const file = require('./file');
const whitelist = require('./whitelist');

module.exports = {
  ...user,
  ...admin,
  ...vote,
  ...item,
  ...record,
  ...file,
  ...whitelist,
};