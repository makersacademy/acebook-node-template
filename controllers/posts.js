const Comments = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const PostsController = {
  Index: async (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), username: posts.username});
    });
  },
  New: (req, res) => {
    res.render("posts/new");
  },
  Create: (req, res) => {
    const post = new Post({message: req.body.message, username: req.session.user.username})
    post.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
  Comments: async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
    const arr = await Comments.find({postId: id}, {content: 1})
    const newArray = [];
      arr.forEach( element => 
        newArray.push(element.content)
      )
      res.render("posts/comments", {post: post, id: id, comments: newArray.reverse()});
    }, 
  Likes: (req, res) => { 
    const id = req.params.id
    Post.updateOne({_id: id}, { $push: {likes: "1"}}, (err) => {
      if(err) { 
        throw err;
      }
      
    res.status(201).redirect("/posts");
  });
  },
};


module.exports = PostsController;