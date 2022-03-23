const Post = require("../models/post");
const Comment = require("../models/comment");
const ImageModel = require("../models/image");
const { response } = require("../app");


const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.json({posts: posts, user: req.session.user})
    })
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {

    const userName = req.session.user.firstName + " " + req.session.user.lastName
    const userImage = req.session.user.image.imgPath;
    console.log(userImage)
    const post = new Post({message: req.body.message, user: userName, userImage: userImage });
    post.save((err) => {
      if (err) {
        throw err;
      }
      console.log(req.body)
      res.status(201).redirect("/posts");
    });

  },

  Comment: async (req, res) =>  {
    Post.find({_id: req.params._id}, function(err, posts) {
      if (err) {
        throw err;
      }
      res.render('posts/comment', {
        posts: posts});
    });
  },


  CreateComment: (req, res) => {

    const username = req.session.user.firstName + " " + req.session.user.lastName

    var comment = new Comment({ note: `${req.body.comments}`, user: username})
  console.log(req.session.user)
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$push: {comments: comment}},
    function(err, posts) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },

  // untested code for controller
  // like functionality
  LikeComment: (req, res) => {
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$inc: {likes: 1}},
    function(err) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },
  //image uploads


  // delete post functionality
  Delete: (req, res) => {
    Post.findByIdAndRemove({_id: req.params._id}, function(err) {
      if (err) {
        throw err;
        }
        res.status(201).redirect('/posts');
      });
    },
  };

module.exports = PostsController;
// ImageModel.find((err, photos) => {
//   if (err) {
//     throw err;
//   }

//   res.render("posts/photos", { photos: photos });
// });