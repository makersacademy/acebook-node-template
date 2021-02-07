var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a new instance of schema to define the structure of the 'post' document/table that we want to store in the database collection
var ContentSchema = new Schema({
  post: String,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

var Content = mongoose.model('Content', ContentSchema); // compile the ContentSchema to create a Content model

module.exports = Content;