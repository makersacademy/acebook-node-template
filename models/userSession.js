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
  isOnline: {
    type: Boolean,
    default: true
  }
})

var userSession = mongoose.model('userSessions', userSessionSchema)
module.exports = userSession;