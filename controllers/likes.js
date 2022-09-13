const Post = require("../models/post");

const LikesController = {
  Create: (req, res) => {
    userId = req.session.user._id;
    postId = req.params.postId

    Post.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { likes: userId } },
      { new: true },
      (err, post) => {
        if(err) {
          console.log(err);
        } else {
          console.log(`A like from ${userId} is added to ${postId}`)
          const numberOfLikes = post.likes.length;

          res.send("posts/index", {
            counter: numberOfLikes
          });
        };
      });
  },
};

module.exports = LikesController;