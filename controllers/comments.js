const Comment = require("../models/comment");

const CommentsController = {
  Create: async (req, res) => {
    const comment = new Comment({
      post: req.body.postId,
      user: req.session.user.username,
      content: req.body.commentContent,
    });

    await comment.save();

    res.redirect("/posts");
  },
};

module.exports = CommentsController;
