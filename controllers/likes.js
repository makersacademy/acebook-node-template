const Like = require("../models/like");
const Post = require("../models/post");

const LikesController = {
  AddLike: (req, res) => {
    Post.findOne({ _id: req.body.post_id }).exec((err, post) => {
      if (err) {
        throw err;
      }

      const filter = { _id: post.likes };
      const update = { $push: { likes_array: [req.session.user._id] } };

      Like.findOneAndUpdate(
        filter,
        update,
        { new: true, useFindAndModify: false },
        (err) => {
          if (err) {
            throw err;
          }
          res.status(201).redirect("/posts");
        }
      );
    });
  },

  RemoveLike: (req, res) => {
    const user_id = req.session.user._id;

    Post.findOne({ _id: req.body.post_id })
      .populate("likes")
      .exec((err, post) => {
        if (err) {
          throw err;
        }

        const filter = { _id: post.likes };
        const update = { $pullAll: { likes_array: [{ _id: user_id }] } };

        Like.findOneAndUpdate(
          filter,
          update,
          { new: true, useFindAndModify: false },
          (err, like) => {
            if (err) {
              throw err;
            }
            console.log(like);

            res.status(201).redirect("/posts");
          }
        );
      });
  },
};

module.exports = LikesController;
