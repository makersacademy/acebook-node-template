const Comment = require("../models/comment");

const CommentsController = {
  Create: async (req, res) => {
    const comment = new Comment({
      post: req.body.postId,
      user: req.session.user.username,
      content: req.body.commentContent,
    });

    // const error = await comment.save().catch((err) => err);
    comment.save((err) => {
    if (err) {
      return res.status(400).render("posts/new", { error: err.message });
    }

    res.status(201).redirect("/posts");
    }),
  };
};

module.exports = CommentsController;
