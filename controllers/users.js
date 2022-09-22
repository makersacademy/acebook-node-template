const User = require("../models/user");
const fs = require('fs');
const path = require("path");
const multer = require('multer');

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res, next) => {
    console.log(req.file);
    const obj = {
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      image: {
          data: fs.readFileSync(path.join('./public/images/' + 'Photo_Rex.jpeg')),
          contentType: 'image/png'
      }
  }
    console.log(obj);
    const user = new User(obj);

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
      next();
    });
  },
};

module.exports = UsersController;
