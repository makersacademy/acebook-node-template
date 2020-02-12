var Post = require('../models/post');  // connects to the model which allows you to access database
var Users = require('../models/users');
// var ObjectId = require('mongodb').ObjectId;


var PostsController = {
  Index: function(req, res) {
    Post.find(function(err, posts) {    // like select all in sql
      if (err) { throw err; }       // if it returns an error throw the error

      res.render('posts/index', { posts: posts.reverse() });  // render the post index view
    });
  },

  New: function(req, res) {
    if (req.cookies['username']){
      // Users.findOne({username: req.cookies['username']}, function(req, user) {
      //   res.render('posts/new', {friends: user.friendslist});    // render the 'new' index view
      // })

      var userList = new Array
      Users.find(function(req, user) {
        user.forEach(function(person) {
          userList.push(person.username)
        });

        res.render('posts/new', {friends: userList});    // render the 'new' index view
      })
    } else {
      res.redirect('/users/register');
    }
  },

  Create: function(req, res) {
    if (req.cookies['username']){       // if there is a user logged in (cookie isn't empty)

    var post = new Post({
      message:req.body.message,
      postedby: req.cookies['username'],     //retrieve username from cookie
      tags: req.body.taglist.toString().split(", ")
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
    res.cookie('post', req.params.id)            // getting cookie containing ID of post we are commenting on
    res.render('posts/viewcomments', { id: req.params.id });    // post ID in URL
  },

  CreateComments: function(req,res) {     // function for adding a comment
    var postid= req.cookies['post'];      // retrieves cookie with Post ID

    Post.findOne({_id: postid},function(err, foundObject) {   // find post with the ID
      if(err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!foundObject) {
          res.status(404).send();
        } else {
          // foundObject.comments = req.body.comments;
          foundObject.comments.push(req.body.comments);     // add the comment to the array in the post db
          foundObject.save(function(err, updatedObject) {     // save
            if(err) {
              console.log(err);
              res.status(500).send();
            } else {
              res.redirect('/posts');
          }
        })
      }
    }
  });
  },
};

module.exports = PostsController;
