const Comment = require("../models/comment");
const Post = require("../models/post");

const CommentsController = {
  Create: async (req, res) => {
    const id = req.params.id;
    req.body = {
      commentMessage: req.body.commentmessage,
      post: id,
    };
    const comment = new Comment(req.body);
    await comment.save();
    const postRelated = await Post.findById(id);
    postRelated.comments.push(comment);
    await postRelated.save(function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect("/posts");
    });
  },
};

module.exports = CommentsController;
