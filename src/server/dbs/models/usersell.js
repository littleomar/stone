const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSellSchema = new Schema({
  name: {
    type: String
  },
  date: {
    type: String
  },
  comments: {
    type: String
  }
});

module.exports = mongoose.model('UserSell',UserSellSchema)
