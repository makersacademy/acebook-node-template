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
      alert('Fam! Log in first!')
      return res.status(401).redirect('/posts')
    }
  },
  Delete: function(req, res) {
      Post.findById(req.params.id, (err, post) => {
        if(req.user._id == post.author) {
          post.deleteOne( function(err) {
            if (err) { throw err;}

            res.status(201).redirect('/posts');
        });
        }else {
          alert('Bruh! You cant be deleting ppls posts like that')
          return res.status(401).redirect('/posts')
        }
          
      })
      
  },

  Edit: function(req, res) {
    Post.findById(req.params.id, (err, post) => {
      if(req.user._id == post.author) {
        var id = req.params.id;
        var edit = req.body.edited;
        Post.updateOne({_id: id},{message: edit}, (err) => {

          if(err){
            return res.status(401).redirect('/posts');
          }
          else {
            return res.status(200).redirect('/posts')
          }
        
      })
      } else {
        alert('Bruh! You cant be editing ppls posts like that')
        return res.status(401).redirect('/posts')
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
    Comment.findById(req.params.id, (err, comment) => {
      if(req.user._id == comment.author) {
        var id = req.params.id;
        var edit = req.body.edited;
        Comment.updateOne({_id: id},{message: edit}, (err) => {

          if(err){
            return res.status(401).redirect('/posts');
          }
          else {
            return res.status(200).redirect('/posts')
          }
        
      })
      } else {
        alert('Bruh! You cant be editing ppls comment like that')
        return res.status(401).redirect('/posts')
      }
      
    }) 
  },

  DeleteComment: function(req, res) {
    Comment.findById(req.params.id, (err, comment) => {
      if(req.user._id == comment.author) {
        comment.deleteOne( function(err) {
          if (err) { throw err;}

          res.status(201).redirect('/posts');
      });
      }else {
        alert('Bruh! You cant be deleting ppls comments like that!')
        return res.status(401).redirect('/posts')
      }
        
    })
  },


};

module.exports = PostsController;