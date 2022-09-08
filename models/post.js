const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
<<<<<<< HEAD
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  username: String,
  time_posted: String,
=======
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
>>>>>>> 3a1c29764fd4dfb972544dd6cb22a140616b48a0
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
