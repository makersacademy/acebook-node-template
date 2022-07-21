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
    console.log(req.body) // delete this line after testing
    console.log(req._startTime) // delete this line after testing
    const post = new Post(req.body);
    // const datepost = (req._startTime); // gets time/date from message body
    const todaysdate = Date().slice(0, -31); // gets time/date from mongoose
    // console.log(todaysdate);
    // console.log(datepost);
    // console.log(post);
    // console.log(post.message);
    // Object.assign(post, {date: datepost}); // adds key/value pair to object
    Object.assign(post, {date: todaysdate}); // adds key/value pair to object
    // console.log(post);
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
      post.likes += 1;

      post.save(function(err) {
        if (err) {throw err;}
        res.status(201).redirect('/posts')
      });
    });
  },

};

module.exports = PostsController;
