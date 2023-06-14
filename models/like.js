const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  liked: { type: Boolean, default: false },
});

LikeSchema.index({ user: 1, post: 1 }, { unique: true });

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
