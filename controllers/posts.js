const Comments = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const PostsController = {
  Index: async (req, res) => {
    const user  = await User.find()
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse(), user: user});
    });
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
  Comments: async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id)
    const arr = await Comments.find({postId: id}, {content: 1})
    const newArray = [];
      arr.forEach( element => 
        newArray.push(element.content)
      )
      res.render("posts/comments", {post: post, id: id, comments: newArray.reverse()});
    }
}

module.exports = PostsController;