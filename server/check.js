const model = require('./model');
const utils = require('./utils');
const _ = require('underscore');

//检查投票资格 和 权重
async function checkVote({ voteId, itemId, userId, level, wlevel, rule, year, month, day }) {
  let records = [], votecount = 1;
  if (rule.rate == 'total') {//活动周期内
    records = await model.Record.find({ voteId, userId });
  } else if (rule.rate == 'everyday') {//活动周期内每天
    records = await model.Record.find({ voteId, userId, year, month, day });
  } else if (rule.rate == 'everyteam+everyday') {//活动周期内每队每天
    records = await model.Record.find({ voteId, itemId, userId, year, month, day });
  }
  if (rule[level] > votecount) votecount = rule[level];
  if (rule[wlevel] > votecount) votecount = rule[wlevel];
  return utils.ResObj({ voteable: records.length < rule.count, votecount });
}

module.exports = {
  checkVote
}