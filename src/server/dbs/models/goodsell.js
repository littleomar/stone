const mongoose = require('mongoose')
const Schema = mongoose.Schema
const GoodSellSchema = new Schema({
  manifest: {
    type: String
  },
  name: {
    type: String
  },
  count: {
    type: Number
  },
  meter: {
    type: String
  },
  totalMeter: {
    type: String
  },
  price: {
    type: Number
  },
  buyTime: {
    type: String
  },
  goodTime: {
    type: String
  },
  comments: {
    type: String
  },
  total: {
    type: String
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model('GoodSell',GoodSellSchema)
