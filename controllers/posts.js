var Post = require('../models/post');  // connects to the model which allows you to access database
var ObjectId = require('mongodb').ObjectId;


var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {    // like select all in sql
      if (err) { throw err; }       // if it returns an error throw the error

      res.render('posts/index', { posts: posts.reverse() });  // render the post index view
    });
  },
  New: function(req, res) {
    if (req.cookies['username']){
      res.render('posts/new', {});    // render the 'new' index view
    } else {
      res.redirect('/users/register');
    }
  },

  Create: function(req, res) {
    if (req.cookies['username']){
    var post = new Post({
      message:req.body.message,
      postedby: req.cookies['username'],
      // comments: " "
    });  // creates a new instance of post with the text
    post.save(function(err) {       // saves the new post
      if (err) { throw err; }

      res.status(201).redirect('/posts');      // if it works show you the list of posts
    });
  } else {
    res.redirect('/users/register');
  }
},

  ViewComments: function(req, res) {
    res.cookie('post', req.params.id)            // getting cookie for the current logged in user
    res.render('posts/viewcomments', { id: req.params.id });
    console.log(req.params.id)
  },

  CreateComments: function(req,res) {
    var postid= req.cookies['post'];

    Post.findOne({_id: postid},function(err, foundObject) {
      if(err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!foundObject) {
          res.status(404).send();
        } else {
          // foundObject.comments = req.body.comments;
          foundObject.comments.push(req.body.comments);
          foundObject.save(function(err, updatedObject) {
            if(err) {
              console.log(err);
              res.status(500).send();
            } else {
              res.redirect('/posts');
          }
        })
      }
    }
    // Post.update({"_id" : ObjectId(postid)},{ $set:{"comments": req.body.comments}});
    // db.posts.update({"_id" : ObjectId("5e3850093570ca13c79157a3")},{$set:{'comments':'New comment'}});
  });
  },
};

module.exports = PostsController;
