var Post = require('../models/post');  // connects to the model which allows you to access post schema in the database
var Users = require('../models/users'); //connect to the model which allows you to access user schema in the database


var PostsController = { //this refers to class PostsController
  Index: function(req, res) { //index is a function/method within PostsController class
    Post.find(function(err, posts) {    // find is equivalent to select all in SQL
      if (err) { throw err; }       // if it returns an error throw the error

      res.render('posts/index', { posts: posts.reverse() });  // otherwise render the post index view passing posts from the find in reversed order
    }); //this function shows all of the posts in reverse order (from newest to oldest)
  },

  New: function(req, res) { //this refers to the method New
    if (req.cookies['username']){ // if there is a user logged in (cookie isn't empty)
      var userList = new Array //
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

  Create: function(req, res) { //this refers to Create function/method which posts the newly created post
    if (req.cookies['username']){       // if there is a user logged in (cookie isn't empty)

    var post = new Post({
      message:req.body.message, //req.body refers to user input and message refers to id of the form
      postedby: req.cookies['username'],     //retrieve username from cookie
      tags: req.body.taglist.toString().split(", ")
    });  // creates a new instance of post with the text
    post.save(function(err) {       // saves the new post
      if (err) { throw err; } //if error throws error

      res.status(201).redirect('/posts');      // else if it works show you the list of posts
    });
  } else {
    res.redirect('/users/register'); //if there is no user logged in then redirects to the register page
  }
},

  ViewComments: function(req, res) { //this function allows you to render page to add a comment
    res.cookie('post', req.params.id)            // get the ID of the post from URL and save it in a cookie called post (so we can use it in another route below)
    res.render('posts/viewcomments', { id: req.params.id });    // get the ID of the post from the URL so can pass it through another post inside viewcomments view
  },

  CreateComments: function(req,res) {     // this function posts the comment
    var postid= req.cookies['post'];      // this retrieves cookie with Post ID from the above route

    Post.findOne({_id: postid},function(err, foundObject) {   // finds post and all of the post field using the cookie postid
      if(err) {
        console.log(err);
        res.status(500).send();
      } else {
        if (!foundObject) { //if the post isn't found then send an error
          res.status(404).send();
        } else {
          foundObject.comments.push(req.body.comments);     // add the input (entered comment) by the user to the array in the post db
          foundObject.save(function(err, updatedObject) {     // save it
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
