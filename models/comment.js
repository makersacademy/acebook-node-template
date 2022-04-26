const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: () => { return this.comment != "" },
    },

    author: {
        type: String,
    },

    post_id: {
        type: String,
    }
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
