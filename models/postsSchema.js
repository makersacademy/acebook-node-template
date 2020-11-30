var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({

  message: {
    type: String,
    required: true
  },
  date:{
    type: Date,
    default: Date.now
  },
  likes:{
     type: Array,
     required: false
  }
});

module.exports = PostSchema;
