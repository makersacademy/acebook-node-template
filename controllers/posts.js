const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }

      res.render("posts/index", { posts: posts });
    }).sort({date:-1});
  },
  New: (req, res) => {
    res.render("posts/new", {});
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.date = Date.now();
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
 
   Like: (req, res) => {
    const postId = req.params.id;
    const userId = req.session.user._id

    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      if (!post.liked_by.includes(userId)) {
        post.likes = post.likes + 1;
        post.liked_by.push(userId)

        post.save((err) => {
          if (err) {
            throw err;
          }
        });
      }
      res.redirect("/posts");
    });
  },

  Details: (req, res) => {
    const postId = req.params.id;
    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      
      return post;
    }).then((post) => (
      Comment.find((err, comments) => {
        if (err) {
          throw err;
        }
        
        res.render("posts/details", {comments: comments, post: post});
      }).where({post_id: postId})
    ));
  },

  CreateComment: (req, res) => {
      const postId = req.params.id;

      console.log(postId);

      const comment = new Comment(req.body);
      comment.post_id = postId;

      if (comment.message[0] === " ") {
        const trimmed = comment.message.trim();
        if (trimmed.length != 0) {
          comment.save((err) => {
            if (err) {
              throw err;
            }
            
            res.status(201).redirect(`/posts/${postId}`);
          });
        } else {
          res.status(201).redirect(`/posts/${postId}`);
        }
      } else {
        comment.save((err) => {
          if (err) {
            throw err;
          }
          
          res.status(201).redirect(`/posts/${postId}`);
        });
      }
  }
};

module.exports = PostsController;
