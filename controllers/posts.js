const Post = require("../models/post");
const Comment = require("../models/comment");

const PostsController = {
  Like: async (req, res) => {
    const postID = req.body.post;
    const userID = req.session.user._id;
    const post = await Post.findOne({ _id: postID });

    const userAlreadyLiked = post.likes.includes(userID);
    if (userAlreadyLiked) {
      const index = post.likes.indexOf(userID)
      post.likes.splice(index, 1)
    } else {
      post.likes.push(userID);
    }

    await post.save();
    res.status(201).redirect("/posts");
  },

  // Comment: async (req, res) => {
  //   const post_id = req.body.postID;

  //   const comment = new Comment({
  //     postID: post_id,
  //     postedBy: req.session.user._id,
  //     comment: req.body.comment
  //   });

  //   console.log(comment)
  //   comment.save(async (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     const postID = { _id: postID };
  //     const addComment = {$push: {comments: {message: req.body.comment, user: req.session.user }}};
      
  //     console.log(comment)
  //     await Post.findOneAndUpdate(postID, addComment, {new: true, useFindAndModify: false}, (err) => {
  //       if (err) {
  //         throw err;
  //       }
  //       res.status(201).redirect("/posts"); 
  //     })
  //   })
  // },

  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      res.render("posts/index", {
        posts: posts.reverse(),
        title: "Acebook",
        firstName: req.session.user.firstName,
        userID: req.session.user._id,
        comments: posts.comments
      });
    });
  },

  // New: (req, res) => {
  //   res.render("posts/new", {});
  // },

  Create: (req, res) => {
    const post = new Post(req.body);
    if (post.message == "") {
      Post.find((err, posts) => {
        if (err) {
          throw err;
        }
        res.render("posts/index", {
          posts: posts.reverse(),
          title: "Acebook",
          blank: "Please enter a message",
          firstName: req.session.user["firstName"]
        });
      });
    } else {
      post.save((err) => {
        if (err) {
          throw err;
        }
        res.status(201).redirect("/posts");
      });
    }
  },
};


module.exports = PostsController;
