const Post = require("../models/post");
const Comment = require("../models/comment");

const CommentsController = {
  Create:
    ("/posts/:id/comment",
    async (req, res) => {
      let comment = new Comment();
      const id = req.params.id;
      comment.message = req.body.message;
      comment.username = req.session.user.username;
      comment.dateAndTime = Date();
      comment.post = id;
      console.log(comment);

      await comment.save();
      // get this particular post
      const postRelated = await Post.findById(id);
      // push the comment into the post.comments array
      // postRelated.comments.push(comment);
      postRelated.comments.push(comment);
      // save and redirect...
      await postRelated.save(function (err) {
        if (err) {
          console.log(err);
        }
        res.redirect("/posts");
      });
    }),
};

module.exports = CommentsController;
