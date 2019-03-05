const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CustomerSchema = new Schema({
  username: {
    type: String
  },
  telephone: {
    type: Array
  },
  region: {
    type: String
  }
});

module.exports = mongoose.model('Customer',CustomerSchema)
