const Post = require("../models/post");

const LikesController = {
  Create: (req, res) => {
    userId = req.session.user._id;
    postId = req.params.postId

    console.log("this post is being liked")
    console.log(postId);

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

          res.send(JSON.stringify({ counter: numberOfLikes }));
        };
      });
  },
};

module.exports = LikesController;