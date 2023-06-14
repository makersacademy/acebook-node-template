const Comment = require("../models/comments");
const Post = require('../models/post');

const CommentsController = {
    CreateComment: (req, res) => {
        const comment = new Comment(req.body);
        comment
        .save()
        .then(() => Post.findById(req.params.postId))
        .then((post) => {
        post.comments.unshift(comment);
        return post.save();
        })
        .then(() => res.redirect('/posts/:postId'))
        .catch((err) => {
        console.log(err);
     });
    }
};


module.exports = CommentsController;
