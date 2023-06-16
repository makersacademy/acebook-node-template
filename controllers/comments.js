const Comment = require("../models/comment");

const CommentsController = {
  Create: async (req, res) => {
    const comment = new Comment({
      post: req.body.postId,
      user: req.session.user.username,
      content: req.body.commentContent,
    });

    try {
      await comment.save();
      res.redirect("/posts");
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/posts");
    }
  },
};

module.exports = CommentsController;
