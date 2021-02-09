var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a new instance of schema to define the structure of the 'post' document/table that we want to store in the database collection
var ContentSchema = new Schema({
  post: {
    type: String,
    required: true
  }
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // createdDate: {
  //   type: Date,
  //   required: true,
  //   default: Date.now
  // }
});

var Content = mongoose.model('Content', ContentSchema); // compile the ContentSchema to create a Content model

module.exports = Content;