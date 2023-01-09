const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const user = req.session.user
      posts = posts.sort((a,b) => b.date-a.date ) //sorts the posts by date order before rendering
      res.render("posts/index", { posts: posts, shownavbar:true, user: user});
    }); 
  },

  New: (req, res) => {
    res.render("posts/new", {shownavbar:true});
  },
  
  Create: (req, res) => {
    const post = new Post({message:req.body.message,author:req.session.user.username});
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  //added a like object that has an anonymous f(x) for the PostController 'class'
  //this should send a post request to update the db using the postID retrieved from the 
  Like: (req, res) => {
    const postId = req.params.id;
    const action = req.body.action;
    if (action === 'Like') {
      Post.updateOne({ _id: postId }, { $inc: { likes: 1 } }, function (error) {
        if (error) {
          res.send(error);
          console.log(error)
        } else {
          console.log('like updated')
          res.send('Like added');
        }
      });
    } else if (action === 'Unlike') {
      Post.updateOne({ _id: postId }, { $inc: { likes: -1 } }, function (error) {
        if (error) {
          res.send(error);
        } else {
          res.send('Unlike added');
        }
      });
    } 
  },

  Love: (req, res) => {
    const postId = req.params.id;
    const action = req.body.action;
    if (action === 'Love') {
      Post.updateOne({ _id: postId }, { $inc: { loves: 1 } }, function (error) {
        if (error) {
          res.send(error);
          console.log(error)
        } else {
          console.log('love updated')
          res.send('Love added');
        }
      });
    } else if (action === 'Hate') {
      Post.updateOne({ _id: postId }, { $inc: { loves: -1 } }, function (error) {
        if (error) {
          res.send(error);
        } else {
          res.send('Hate added');
        }
      });
    } 
  }
};



module.exports = PostsController;
