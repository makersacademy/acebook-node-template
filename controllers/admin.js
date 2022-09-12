const Post = require("../models/post");
// const User = require("../models/user");
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
    // if (req.body.user === "admin" && req.body.password === "password") {
    Post.find((err, posts) => {
      if (err) {
        // do something if error
        throw err;
      } else {
        res.send(posts);
      }
    });
    // }
  },

  Destroy: (req, res) => {
    console.log(req.body);

    // when logged in as an admin
    if (req.body.user === "admin" && req.body.password === "password") {
      // checking if posts in db exist
      mongoose.connection.collections.posts.count().then((result) => {
        if (result > 0) mongoose.connection.collections.posts.drop();

        // checking if users in db exist
        mongoose.connection.collections.users.count().then((result) => {
          if (result > 0) mongoose.connection.collections.users.drop();

          console.log("all tables erased");
          res.send();
        });
      });
    } else {
      console.log("wrong credentials given");
    }
  },
};

module.exports = AdminController;
