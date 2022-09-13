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

    console.log(comment)
    comment.save(async (err) => {
      if (err) {
        throw err;
      }
      const postID = { _id: postID };
      const addComment = {$push: {comments: {message: req.body.comment, user: req.session.user }}};
      
      console.log(comment)
      await Post.findOneAndUpdate(postID, addComment, {new: true, useFindAndModify: false}, (err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts"); 
      })
    })
  }
}

module.exports = CommentsController;