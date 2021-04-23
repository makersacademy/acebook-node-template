require('../models/post');
var Post = require('../models/post');
require('../routes/posts');

require('../models/post')
var Comment = require('../models/comment')  

var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    }).populate('comments').sort({date: -1});
    
  },
  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
  Delete: function(req, res) {
    var post = Post.findById(req.params.id)
    post.deleteOne( function(err) {
      if (err) { throw err;}
      const response = {
        message: "Post successfully deleted",
        id: post._id
      };
      res.status(201).redirect('/posts');
    });
  },

  Edit: function(req, res) {
    id = req.params.id;
    edit = req.body.edited;
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


};

module.exports = PostsController;
