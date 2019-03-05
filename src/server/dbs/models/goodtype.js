const mongoose = require('mongoose')
const Schema = mongoose.Schema
const GoodTypeSchema = new Schema({
  typeName: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
});

module.exports = mongoose.model('GoodType',GoodTypeSchema)
