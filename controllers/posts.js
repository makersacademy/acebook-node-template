const Comments = require("../models/comment");
const Post = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts)=> {
      if (err) {
        throw err;
      }
      res.render("posts/index", { posts: posts.reverse() });
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
    // The post's id is passed into the URL
    const post = await Post.findById(id)
    // post is the post w/the specified id - the original post. 
    const arr = await Comments.find({postId: id}, {content: 1})
    // array of comments with the postId 
    const newArray = [];
      arr.forEach( element => 
        newArray.push(element.content)
      )
      // newArray holds all of the comments in an array
      res.render("posts/comments", {post: post, id: id, comments: newArray.reverse()});
      // This is then all passed into the view to be used.
    }
}

module.exports = PostsController;