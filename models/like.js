const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  liked: { type: Boolean, default: false },
});

LikeSchema.index({ user: 1, post: 1 }, { unique: true });

// LikeSchema.pre("save", async function (next) {
//   try {
//     const found = await this.model("Like").findOne({
//       user: this.user,
//       post: this.post,
//     });
//     if (found) {
//       const error = new Error("duplicate key error");
//       error.code = 11000;
//       next(error);
//     } else {
//       next();
//     }
//   } catch (error) {
//     next(error);
//   }
// });

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
