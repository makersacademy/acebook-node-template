const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      console.log('session when page is loaded');
      console.log(req.session.user);
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
    // req params passes in the user id & post id
    // post id looks up the post and adds the user id to post.likes array
    // let likedPost = Post.findById(req.params.postId);
    // if (likedPost.likes.includes(req.params.userId)) {

    // }
    // check if the userId is already in the likes array, if not:
    // likedPost.likes.push(req.params.userId);
    // if it is in the array, remove it

    res.status(201).redirect("/users/new");
  }
};

module.exports = PostsController;
