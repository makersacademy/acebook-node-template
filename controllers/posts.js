const session = require("express-session");
const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
       }              
      //posts.reverse also possible here
      // console.log(Date(posts[1].date))
      const array = posts.sort(function(dateA,dateB){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(dateB.date) - new Date(dateA.date);
      });
      
      res.render("posts/index", { posts: array });
    });
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    //accessing date at time of post creation and converting into nice format by removing last 31 characters
    post.date = Date().slice(0, -31)
    //accessing user first name & last name
    post.author_name = `${req.session.user.first_name} ${req.session.user.last_name} `
    post.author_id  = `${req.session.user._id} `

    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Comment: (req, res) => {
    const comment = new Comment(req.body);
    //accessing date at time of post creation and converting into nice format by removing last 31 characters
    comment.date = Date().slice(0, -31)
    //accessing user first name & last name
    comment.author_name = `${req.session.user.first_name} ${req.session.user.last_name} `
    comment.author_id  = `${req.session.user._id} `

    comment.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
