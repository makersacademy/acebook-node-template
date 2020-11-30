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
  like: {
    type:  Array
}

});

module.exports = PostSchema;
