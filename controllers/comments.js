const Comment = require("../models/comment");
const Post = require("../models/post")

const CommentsController = {
  Create: (req, res) => {
    const post_id = req.body.post_id;
    const comment = new Comment(req.body);

    Post.findById(post_id).exec((err, post) => {
      if (err) {
        console.log(err);
        throw err;
      }
      post.comments.push(comment._id);

      post.save((err) => {
        if (err) {
          console.log(err)
          throw err;
        }
      });
    });

    comment.save((err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },    
};

module.exports = CommentsController;