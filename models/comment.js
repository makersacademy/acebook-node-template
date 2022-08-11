// const mongoose = require('mongoose');
// const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: { type: String, required: true },
  timeCreated: {
    type: String,
    default: function () {
      const date = new Date();

      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      // 11/08/2022 10:48:05
    },
  },
});

// const Comment = mongoose.model('Comment', CommentSchema);

// module.exports = Comment