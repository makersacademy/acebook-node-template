const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

const CommentsController = {

  Create: async (req, res) => {
    const post_id = req.body.postID;
 
    console.log(req.session.user)
    const comment = new Comment({
      postID: post_id,
      postedBy: req.session.user._id,
      comment: req.body.comment
    });

    comment.save(async (err) => {
      if (err) {
        throw err;
      }

      const filter = { _id: post_id };
      const update = {$push: {comments: comment._id}};
      
      await Post.findOneAndUpdate(filter, update)
      res.status(201).redirect("/posts"); 
    })
  }
}


module.exports = CommentsController;