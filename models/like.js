const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
});

const Like = mongoose.model("Like", LikeSchema);

LikeSchema.index({ userId: 1, postId: 1 }, { unique: true });

module.exports = Like;
