const Post = require("../models/post");
const Comment = require("../models/comment");

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
    const username = req.session.user.firstName + " " + req.session.user.lastName
    const post = new Post({message: req.body.message, user: username});
    post.save()
    .then(element =>{
      console.log('post saved!')
      res.json({message: "post saved"})
    }).catch(err=>{
      console.log(err)
      res.json({error: 'error'})
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
