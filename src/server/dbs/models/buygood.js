const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BuyGoodSchema = new Schema({
  name: {
    type: String
  },
  count: {
    type: Number
  },
  comments: {
    type: String
  },
  buyTime: {
    type: String
  },
  goodTime: {
    type: String
  }
});

module.exports = mongoose.model('BuyGood',BuyGoodSchema)
