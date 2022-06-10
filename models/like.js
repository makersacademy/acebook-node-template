const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  post_id: String,
  likes_array: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;


