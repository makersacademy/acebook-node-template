const Post = require("../models/post");

const LikesController = {
  Update: (req, res) => {
    const userId = req.session.user._id;
    const postId = req.params.postId;

    console.log("this post is being liked");
    console.log(postId);

    Post.findOne({ _id: postId, likes: userId }, (err, post) => {
      // checks to see if the user has liked the post
      if (err) {
        // do something if error
        console.log(err);
      } else {
        // if user hasn't liked the post, add the userID to the likes array in the post entry
        // if they have, remove the userId from the likes array
        const updateObject = {};
        const updateOperator = !post ? "$addToSet" : "$pull";
        updateObject[updateOperator] = { likes: userId };
        Post.findOneAndUpdate(
          { _id: postId },
          updateObject,
          { new: true },
          (err, post) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`${userId} ${updateOperator} ${postId} likes`);
              res.send(JSON.stringify({ counter: post.likes.length }));
            }
          }
        );
      }
    });
  },
};

module.exports = LikesController;
