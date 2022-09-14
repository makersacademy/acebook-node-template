const Post = require("../models/post");
const Comment = require("../models/comment");

const CommentsController = {

  Create: async (req, res) => {
    const post_id = req.body.postID;
 
    const comment = new Comment({
      postID: post_id,
      postedBy: req.session.user._id,
      comment: req.body.comment
    });

    console.log("I AM HERE")
    console.log(comment)
    comment.save(async (err) => {
      if (err) {
        throw err;
      }
      const filter = { _id: post_id };
      const update = {$push: {comments: comment._id }};
      
      console.log("NOW I AM HERE")
      console.log(update)
      await Post.findOneAndUpdate(filter, update)
      res.status(201).redirect("/posts"); 
    })
  }
}


module.exports = CommentsController;