const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
          posts: posts,
          session: req.session
      });
    }).sort({createdAt: -1}) ;
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  Like: (req, res) => {
    console.log(req.body.userId);
    console.log(req.body.postId);

    // let likedPost = Post.findById(req.body.postId);
    // if (likedPost.likes.includes(req.body.userId)) {
    //   // removing that userId from the array
    //   for (let i = 0; i < likedPost.likes.length; i++) { 
    //     if (likedPost.likes[i] === req.body.userId) { 
    //         likedPost.likes.splice(i, 1); 
    //     }
    //   }
    // } else {
    //   // adding the userId to the array
    //   likedPost.likes.push(req.body.userId)
    // }
    // // TODO need to update the database with likedPost here!!
    res.status(201).redirect("/posts");
  }
};

module.exports = PostsController;
