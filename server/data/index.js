const vote = require('./vote');
const items = require('./items');

module.exports = {
  ...vote,
  items,
}