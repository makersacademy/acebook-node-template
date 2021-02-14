var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a new instance of schema to define the structure of the 'content' document that we want to store in the database
var ContentSchema = new Schema({
  post: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Content = mongoose.model('Content', ContentSchema); // compile the ContentSchema to create a Content model

module.exports = Content;