const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      posts.reverse(); // reorders posts, so newest post is always at the top of the list
      res.render("posts/index", { posts: posts, session: req.session });
    });
  },
  New: (req, res) => {
    res.render("posts/new", { session: req.session, recipient: req.params.user });
  },
  NewWallPost: (req, res) => {
    res.render("posts/new", { session: req.session, recipient: req.body.recipient });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    const todaysdate = Date().slice(0, -31); // gets time/date from mongoose
    const user = req.session.user.email;
    const recipient = req.body.recipient;

    Object.assign(post, {date: todaysdate}); // adds key/value pair to object
    Object.assign(post, {user: user});
    Object.assign(post, {recipient: recipient});

    post.save((err, result) => {
      if (err) {
        throw err;
      } else if (result) {
          res.status(201).redirect("/posts");
      }
    })
  },
  // implementing a delete function:
  Delete: (req, res) => {
    Post.findOneAndDelete(
      {_id: req.body._id},
      (err, result)=>{
        res.status(201).redirect("/posts");
      }
    );  
  },

  UpdateLikes: function(req, res){
    var id = req.params.id;
    Post.findById(id, function (err, post) {
      if (err) {throw err;}
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

  Comment: function(req, res) {
    Post.find({_id: req.params._id}, function(err, post) {
      console.log(err)
      console.log("///")
      console.log(post)
      if (err) {
        throw err;
      }
      res.render('posts/comment', {
        posts:post});
        
    });
  },

  PostComment: function(req, res) {
    Post.findOneAndUpdate({
      _id: req.params._id},
    {$push: {comments: req.body.comments}},
    function(err, posts) {
      if (err) {
        throw err;
      }
    res.status(201).redirect('/posts');
    });
  },
  
};

module.exports = PostsController;
