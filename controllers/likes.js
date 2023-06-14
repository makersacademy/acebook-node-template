const Like = require("../models/like");

const LikesController = {
  Create: async (req, res) => {
    try {
      const existingLike = await Like.findOne({
        user: req.session.user._id,
        post: req.body.postId,
      });

      if (existingLike) {
        existingLike.liked = !existingLike.liked;
        await existingLike.save();
      } else {
        const like = new Like({
          user: req.session.user._id,
          post: req.body.postId,
          liked: true,
        });

        await like.save();
      }

      res.redirect("/posts");
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
};

module.exports = LikesController;
