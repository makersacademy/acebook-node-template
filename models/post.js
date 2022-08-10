const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: { type: String, maxLength: 200, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  like: [{type: Schema.Types.ObjectId, ref: 'User' }],
  comment: [{type: String, maxLength: 200, type: Schema.Types.ObjectId, ref: 'User' }],
  date: {
    type: Date,
    default: () => Date.now()
}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;