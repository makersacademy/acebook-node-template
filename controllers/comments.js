const Comment = require("../models/comment");

const CommentsController = {
  Create: async (req, res) => {
    const comment = new Comment({
      post: req.body.postId,
      user: req.session.user.username,
      content: req.body.commentContent,
    });

    const err = await comment.save().catch((err) => err);
    res.redirect("/posts");

    // comment.save((err) => {
    //   if (err) {
    //     return res.redirect(404, "/posts", { error: err.message });
    //   }

    //   res.redirect("/posts");
    // });
  },
};

module.exports = CommentsController;
