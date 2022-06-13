const Comment = require("../models/comment");
const Post = require("../models/post")

const CommentsController = {
  Create: (req, res) => {
    const post_id = req.body.post_id;
    const comment = new Comment(req.body);

    comment.save((err) => {
      if (err) {
        console.log(err);
        throw err;
      }
      const filter = { _id: post_id };
      const update = {$push: {comments: comment._id }};
      
      Post.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false}, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    });
  },    
};

module.exports = CommentsController;