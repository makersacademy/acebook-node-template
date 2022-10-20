const User = require("../models/user");
const Post = require("../models/post");
const fs = require("fs");
const path = require("path");
//app root directory
let appDir = path.dirname(require.main.filename);
appDir = appDir.replace("bin", "").replace("controllers", "");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", { title: "Sign up to Acebook", layout: "signup" });
  },

  Create: (req, res) => {
    const user = new User(req.body);

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/sessions/new");
    });
  },

  Profile: (req, res) => {
    let session = req.session.user;
    Post.find({ user: session._id }, (err, posts) => {
      if (err) {
        throw err;
      }

      res.render("users/index", {
        posts: posts.reverse(),
        user: session,
      });
    })
      .populate("user")
      .populate("remarks")
      .populate({ path: "remarks", populate: { path: "user" } });
  },

  OtherProfile: (req, res) => {
    let id = req.params.id;
    User.findById(id, (err, users) => {
      if (err) {
        throw err;
      }
      Post.find({ user: id }, (err, posts) => {
        if (err) {
          throw err;
        }

        res.render("users/:id", {
          posts: posts.reverse(),
          user: users,
        });
      })
        .populate("user")
        .populate("remarks")
        .populate({ path: "remarks", populate: { path: "user" } });
    });
  },

  Settings: (req, res) => {
    let session = req.session.user;
    res.render("users/settings", { user: session });
  },

  UpdateSettings: (req, res) => {
    let session = req.session.user;
    let message = "Your Details have been updated successfully";
    User.findById(session._id, (err, user) => {
      if (err) {
        throw err;
      }
      if (req.file) {
        const obj = {
          img: {
            data: fs.readFileSync(
              path.join(appDir + "/public/images/" + req.file.filename)
            ),
            contentType: "image/png",
            code: "",
            photoExists: "",
          },
        };
        obj.img.code = obj.img.data.toString("base64");
        obj.img.photoExists = true;
        user.photo = obj.img;
      } else {
        const defaultObj = {
          img: {
            data: fs.readFileSync(
              path.join(appDir + "/public/images/default-pic.png")
            ),
            contentType: "image/png",
            code: "",
            photoExists: "",
          },
        };
        defaultObj.img.code = defaultObj.img.data.toString("base64");
        defaultObj.img.photoExists = true;
        user.photo = defaultObj.img;
      }

      if (req.body.password == user.password) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.save((err) => {
          if (err) {
            throw err;
          }
          res
            .status(201)
            .render("users/settings", { user: user, message: message });
        });
      } else {
        message = "Your password is incorrect";
        res
          .status(201)
          .render("users/settings", { user: session, message: message });
      }
    });
  },
};

module.exports = UsersController;
