const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse() // reorders posts, so newest post is always at the top of the list

      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { session: req.session });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    const todaysdate = Date().slice(0, -31); // gets time/date from mongoose
    Object.assign(post, {date: todaysdate}); // adds key/value pair to object
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  // implementing a delete function:
  Delete: (req, res) => {
    console.log(req);
    console.log(req.body.id);
    Post.findOneAndDelete(
      {_id: req.body._id},
      (err, result)=>{
      console.log(err);
      console.log(result);
      res.status(201).redirect("/posts");
    });  
  },

  UpdateLikes: function(req, res){
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      if (err) {throw err;}
      console.log(post.likes.emails);
      console.log(req.session.user.email);
      if (!post.likes.emails.includes(req.session.user.email) ) {
        post.likes.count += 1;
        post.likes.emails.push(req.session.user.email);
      }      

      post.save(function(err) {
        if (err) {throw err;}
        res.status(201).redirect('/posts')
      });
    });
  },

};

module.exports = PostsController;
