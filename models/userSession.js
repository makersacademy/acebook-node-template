var mongoose = require('mongoose')

var userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

var userSession = mongoose.model('userSessions', userSessionSchema)
module.exports = userSession;