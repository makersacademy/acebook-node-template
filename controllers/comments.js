const Comment = require("../models/comment");
const commentService = require("../services/commentService");

const CommentsController = {
  Create: async (req, res) => {
    const commentData = new Comment({
      post: req.body.postId,
      user: req.session.user.username,
      content: req.body.commentContent,
    });

    try {
      await commentData.save();
      console.log("saved");
      const comment = commentData.toObject();

      if (req.accepts("json")) {
        res.render(
          "partials/posts/comment",
          { layout: false, comment },
          (err, html) => {
            if (err) {
              res.status(500).json({ error: "Could not render post" });
            } else {
              res.json({ html, comment });
            }
          }
        );
      } else {
        return res.status(201).redirect("/posts");
      }
    } catch (err) {
      res.redirect("/posts");
    }
  },
  Delete: async (req, res) => {
    const commentId = req.params.id;

    try {
      const result = await commentService.deleteCommentById(commentId);

      if (!result) {
        return res.status(404).json({ error: "Comment not found" });
      }

      res.redirect(`/posts`);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

module.exports = CommentsController;
