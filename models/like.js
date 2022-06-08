const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  post_id: String,
  likes: {type: [Number]},
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;