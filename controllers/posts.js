const Post = require("../models/post");
const Friends = require("../models/friend");
const PostsController = {
  Index: async (req, res) => {
    //finds all posts:
    try {
      const user = req.session.user;
      const allFriendsObject = await Friends.find({
        $or: [
          { recipient: user._id, status: 1 },
          { requester: user._id, status: 1 },
        ],
      });
      const allPostsObjects = await Promise.all(
        allFriendsObject.map(async (friendObject) => {
          if (friendObject.requester == user._id) {
            const postsByFriend = await Post.find({
              userId: friendObject.recipient,
            });
            return postsByFriend;
          } else {
            const postsByFriend = await Post.find({
              userId: friendObject.requester,
            });
            return postsByFriend;
          }
        })
      );
      const posts = allPostsObjects.flat().sort((a, b) => b.date - a.date);

      res.render("posts/index", {
        posts: posts,
        session: req.session,
      });
    } catch (error) {
      console.log(error);
    }
  },
  New: (req, res) => {
    res.render("posts/new", {
      session: req.session,
    });
  },
  Create: (req, res) => {
    //const post = new Post(req.body);
    const post = new Post({
      content: req.body.content,
      userId: req.session.user._id,
      username: req.session.user.username,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      res.status(201).redirect("/posts");
    });
  },
  AddComment: (req, res) => {
    const post_id = req.body.post_id;
    const comment_content = req.body.content;
    const user = req.session.user._id;
    const username = req.session.user.username;
    // const user = req.session.user.username;
    const update = {
      $push: {
        comment: [
          { author: user, content: comment_content, username: username },
        ],
      },
    };

    Post.findOneAndUpdate(
      { _id: post_id },
      update,
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    );
    res.status(201).redirect("/posts");
  },

  AddLike: (req, res) => {
    console.log("Add like controller works!");
    const post_id = req.body.post_id;
    const user = req.session.user._id;
    // const user = req.session.user.username;
    console.log("POST ID:", post_id, "user:", user);
    const update = {
      $push: { like: [{ likeAuthor: user }] },
    };

    Post.findOneAndUpdate(
      { _id: post_id },
      update,
      { new: true, useFindAndModify: false },
      (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(data);
        }
      }
    );
    res.status(201).redirect("/posts");
  },
};

module.exports = PostsController;
