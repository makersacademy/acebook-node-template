const Comment = require("../models/comment");

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
              res.json({ html });
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
};

module.exports = CommentsController;
