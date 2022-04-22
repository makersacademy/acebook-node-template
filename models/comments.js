const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  message: String,
  post_id: String  // unsure on this
});

const Comments = mongoose.model("Comments", CommentsSchema);

module.exports = Comments;