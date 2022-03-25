const Post = require("../models/post");
const Comment = require("../models/comment");


const PostsController = {
  Index: (req, res) => {
    Post.find().sort({createdAt: -1})
      .exec((err, posts) => {
      res.json({posts: posts, user: req.session.user})
    })
  },

  New: (req, res) => {
    res.render("posts/new", {});
  },

  Create: (req, res) => {
    const userName = req.session.user.firstName + " " + req.session.user.lastName
    const userImage = req.session.user.image;
    console.log(userImage)
    const post = new Post({message: req.body.message, user: userName, userImage: userImage });
    post.save()
        .then( newPost => {
          res.json(newPost)
        }).catch( err => {
          console.log(err)
        })
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
  const note = req.body.note
  const userImage = req.session.user.image
  var comment = new Comment({ note:`${note}`, user: username, userImage})
  console.log(req.session.user)
    Post.findOneAndUpdate({
      _id: req.body.postId},
    {$push: {comments: comment}},
    function(err, result) {
      if (err) {
        throw err;
      }
    }).then(comment => {
      res.json(comment)
    })
  },

  LikeComment: (req, res) => {
    const userId = req.session.user._id
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$push: {likes: userId}},
    function(err) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },
  //image uploads

  DislikeComment: (req, res) => {
    const userId = req.session.user._id
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$pull: {likes: userId}},
    function(err) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },

  // delete post functionality
  Delete: (request, response) => {
    Post.findByIdAndRemove({_id: request.params._id})
    .then( deletedPost => {
      response.json(deletedPost)
    }).catch ( error => {
      console.log(error)
    })
    },

  };

module.exports = PostsController;
