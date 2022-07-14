const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Create: (req, res) => {
    req.body = {
      message: req.body.commentmessage,
      post: req.params.id 
    };
    const comment = new Comment(req.body);
    comment.save();
    const post = Post.findById(req.params.id)
    post.comments.push(comment)
      post.save(function(err) {
      if(err) {console.log(err)}
      res.redirect("/posts");
    })
  },
};

module.exports = CommentsController;
