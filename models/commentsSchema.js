var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({

  comment: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  author: {
    type: String,
    required: true
  }

});

module.exports = CommentSchema;
