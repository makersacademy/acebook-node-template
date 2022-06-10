const Like = require("../models/like");
const Post = require("../models/post");

const LikesController = {
  AddLike: (req, res) => {
    Post.findOne({_id: req.body.post_id}).exec((err, post) => {
      if (err) {
        throw err;
      }

      const filter = {_id: post.likes};
      const update = {$push: {likes_array: [req.session.user._id]}};

      Like.findOneAndUpdate(filter, update, {new: true, useFindAndModify: false}, (err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      })
    })
  }
}

module.exports = LikesController;