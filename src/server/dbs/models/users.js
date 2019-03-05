const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
  username: {
    type: String
  },
  telephone: {
    type: Array
  },
  tel1: {
    type: Number
  },
  tel2: {
    type: Number
  },
  tel3: {
    type: Number
  },
  tel4: {
    type: Number
  },
  tel5: {
    type: Number
  },
  region: {
    type: String
  }
})

module.exports = mongoose.model('User',UserSchema)
