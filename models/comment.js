const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  timeCreated: {
    type: String,
    default: function () {
      const date = new Date();

      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    },
  },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment