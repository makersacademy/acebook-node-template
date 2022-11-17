const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    message: String,
    likes: { type: Number, default: 0 },
    userID: {type: String},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: { createdAt: true, updatedAt: false } });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;