var Post = require('../models/post');
require('../routes/posts');
var alert = require('alert');
var Comment = require('../models/comment')
var User = require('../models/user');

var PostsController = {
  Index: function(req, res) {
    currentUser = req.user;
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts, currentUser });
    }).populate({path:'comments', populate: {path: 'author'}}).populate('author').sort({createdAt: -1})
    
  },
  New: function(req, res) {
    currentUser = req.user;
    res.render('posts/new', {currentUser});
  },
  Create: function(req, res) {
    if (req.user) {
      User.findById(req.user._id, (err, user) => {
        var post = new Post(req.body);
        post.author = req.user._id;
        post.save((savePostError) => {
          if(savePostError) { throw savePostError; }

          user.posts.push(post)
          user.save();
          res.status(201).redirect('/posts');
        })
      })
    } else {
      alert('Oops, that password is incorrect!')
      return res.status(401).redirect('/posts')
    }
  },
  Delete: function(req, res) {
    var post = Post.findById(req.params.id)
    post.deleteOne( function(err) {
      if (err) { throw err;}
      // const response = {
      //   message: "Post successfully deleted",
      //   id: post._id
      // };
      res.status(201).redirect('/posts');
    });
  },

  Edit: function(req, res) {
    var id = req.params.id;
    var edit = req.body.edited;
    console.log(id)
    console.log(edit)
    Post.findByIdAndUpdate({_id: id},{message: edit}, (err) => {
      if(err){
        console.log(err)
        return res.status(401).redirect('/posts');
      }
      else {
        console.log("All good")
        return res.status(200).redirect('/posts')
      }
    })
  },
  
  Comment: function(req, res) {
    Post.findById(req.params.id, (err, post) => {
      var comment = new Comment(req.body);
      comment.author = req.user._id;
      comment.save((saveCommentError) => {
        if (saveCommentError) { throw saveCommentError; }

        // Push the comment to the post
        post.comments.unshift(comment);

        post.save((savePostError) => {
          if (savePostError) { throw savePostError; }

          res.status(201).redirect('/posts'); 
        })     
      });
    })

  },

  EditComment: function(req, res) {
    var id = req.params.id;
    var edit = req.body.edited;
    console.log(id)
    console.log(edit)
    Comment.findByIdAndUpdate({_id: id},{comment: edit}, (err) => {
      if(err){
        return res.status(401).redirect('/posts');
      }
      else {
        return res.status(200).redirect('/posts')
      }
    })
  },

  DeleteComment: function(req, res) {
    var comment = Comment.findById(req.params.id)
    comment.deleteOne( function(err) {
      if (err) { throw err;}

      res.status(201).redirect('/posts');
    })
  }


};

module.exports = PostsController;