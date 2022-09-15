const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/user");

const mongoose = require("mongoose");

const AdminController = {
  Index: (req, res) => {
    // security features to be implemented laster
    let postsCount, usersCount;

    // counting posts in database
    mongoose.connection.collections.posts.count().then((result) => {
      postsCount = result;

      // counting users in database
      mongoose.connection.collections.users.count().then((result) => {
        usersCount = result;

        res.render("admin/index", {
          postsCount: postsCount,
          usersCount: usersCount,
        });
      });
    });
  },

  Posts: (req, res) => {
    if (req.body.user === "admin" && req.body.password === "password") {
      Post.find((err, posts) => {
        if (err) {
          // do something if error
          throw err;
        } else {
          res.send(posts);
        }
      });
    }
  },

  Destroy: (req, res) => {
    // when logged in as an admin
    if (req.body.user === "admin" && req.body.password === "password") {
      User.deleteMany(() => {
        Post.deleteMany(() => {
          Comment.deleteMany(() => {
            res.send();
          });
        });
      });
    } else {
      console.log("wrong credentials given");
    }
  },
};

module.exports = AdminController;
