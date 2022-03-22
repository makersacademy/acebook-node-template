const Post = require("../models/post");

const PostsController = {
  Index: async (req, res) => {
    try{
      const posts = await Post.find({})
      .populate('user')
      .sort({ createdAt: -1})
      posts.forEach((post) => {
        post.postedAt = post.createdAt.toLocaleString();
      })
      
      res.render("posts/index", { 
        posts: posts,
        title: "Acebook",
        name: req.session.user.name,
        username: req.session.user.username
      });
    } catch {
      console.log("error")
    }
    
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: async (req, res) => {
    req.body.user = req.session.user._id;
    req.body.posted_by = req.session.user.email;
    req.body.likes = 0;
    try{
      const post = new Post(req.body);
      await post.save()
      res.status(201).redirect("/posts");
    } catch (err){
      throw err;
    }
  },
  Test: (req, res) => {
    res.send("Here")
  },
  Like: (req, res) => {
    Post
    .findOneAndUpdate(
      {_id: req.body.postId}, {$inc:{likes: 1}}, {new: true},
      (err) => {
      if (err) {
        throw err;
      }
      //console.log(update);
      res.status(201).redirect("/posts")
    });

  },
  Comment: (req, res) => {
    console.log(req.body)
    Post
    .findOneAndUpdate(
      {_id: req.body.postId},
      { $push: {
        comments: {
          user: req.session.user.name,
          comment: req.body.comment
          }
      }
      },
      {new: true},
      (err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts")
    });
  }
};

module.exports = PostsController;
