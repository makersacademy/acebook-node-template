// const Post = require("../models/post");
// const User = require("../models/user");
const mongoose = require("mongoose");

const AdminController = {
  Index: (req, res) => {
    let postsCount, usersCount;
    mongoose.connection.collections.posts.count().then((result) => {
      postsCount = result;
      mongoose.connection.collections.users.count().then((result) => {
        usersCount = result;
        res.render("admin/index", {
          postsCount: postsCount,
          usersCount: usersCount,
        });
      });
    });
  },

  Destroy: (req, res) => {
    console.log(req.body);
    if (req.body.user === "admin" && req.body.password === "password") {
      mongoose.connection.collections.posts.count().then((result) => {
        if (result > 0) mongoose.connection.collections.posts.drop();

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
