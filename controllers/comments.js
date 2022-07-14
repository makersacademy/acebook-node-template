const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Create: async (req, res) => {
    const id = req.params.id;
    req.body = {
      message: req.body.commentmessage,
      post: id 
    };
    const comment = new Comment(req.body);
    await comment.save();
    const post = await Post.findById(id)
    post.comments.push(comment)
    await post.save(function(err) {
      if(err) {console.log(err)}
      res.redirect("/posts");
    })
  },
};

module.exports = CommentsController;
