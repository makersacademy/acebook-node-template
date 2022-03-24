const Post = require("../models/post");
const Image = require('../models/user');

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
        id: req.session.user._id,
        name: req.session.user.name,
        username: req.session.user.username,
        bio: req.session.user.bio,
        image: req.session.user.image,
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
  Like: async (req, res) => {
    try{
      const post = await Post.findOne({"_id": req.body.postId});
      console.log(post.likes);
      post.likes += 1;
      await post.save();
      if(req.body.prevRoute === "posts"){
        res.status(201).redirect("/posts");
      } else {
        res.status(201).redirect("/profile");
      }
    } catch (err) {
      console.log(err)
    }

  },
  Comment: (req, res) => {
    // console.log(req.body)
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
