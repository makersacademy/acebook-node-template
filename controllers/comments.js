const Post = require("../models/post");
const Comment = require("../models/comment");

const CommentsController = {
  Create: async (req, res) => {
    const post_id = req.body.postID;

    const comment = new Comment({
      postID: post_id,
      postedBy: req.session.user._id,
      comment: req.body.comment,
    });

    if (comment.comment === "") {
      Comment.find((err) => {
        if (err) {
          throw err;
        }
        res.redirect("/posts");
      });
    } else {
      comment.save(async (err) => {
        if (err) {
          throw err;
        }
        const filter = { _id: post_id };
        const update = { $push: { comments: comment._id } };

        await Post.findOneAndUpdate(filter, update);
        res.status(201).redirect("/posts");
      });
    }
  },
};

module.exports = CommentsController;
