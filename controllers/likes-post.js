const Post = require("../models/post");
const LikesPostController = {
  Index: (req, res) => {

  },
  Like: (req, res) => {
    Post.findByIdAndUpdate({_id: req.body.postID}, {$addToSet: {likes: req.session.user._id }}, {new: true, useFindAndModify: false}, (err) => {
      console.log(`error:${err}`)
    })
    res.status(201).redirect("/posts");
  },
  DeleteLike: (req, res) => {
    Post.findByIdAndUpdate({_id: req.body.postID}, {$pull: {likes: req.session.user._id }}, {new: true, useFindAndModify: false}, (err) => {
      console.log(`error:${err}`)
    })
    res.status(201).redirect("/posts");
  }
};

module.exports = LikesPostController;