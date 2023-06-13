const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true}, 
}, { timestamps: true });

module.exports = model('Comment', commentSchema);