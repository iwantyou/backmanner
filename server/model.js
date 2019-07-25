const mongoose = require('mongoose');
const collection = require('./collection');
const utils = require('./utils');

const testSchema = new mongoose.Schema({ _id: { type: String, default: utils.uniqid }, type: { type: String, index: true }, state: Number }, { versionKey: false, collection: 'test' });
testSchema.index({ state: 1 });

module.exports = {
  Test: mongoose.model('test', testSchema),
  ...collection
};