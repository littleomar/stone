const mongoose = require('mongoose')
const Schema = mongoose.Schema
const GoodKindSchema = new Schema({
  nickname: {
    type: String
  },
  name: {
    type: String
  },
  type: {
    type: String
  }
});

module.exports = mongoose.model('GoodKind',GoodKindSchema)
