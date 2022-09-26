const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new mongoose.Schema({
  //adds column to database table
  author_id: String,
  author_name: String,
  message: String,
  date: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});
// }, {timestamps: true});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
