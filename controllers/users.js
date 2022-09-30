const User = require("../models/user");
const fs = require("fs");
const path = require("path");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res, next) => {
    //console.log(req.file);
    const obj = {
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
      image: {
        data: fs.readFileSync(
          path.join("./public/images/" + req.file.filename)
        ),
        contentType: "image/png",
      },
    };
    const user = new User(obj);

    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
      next();
    });
  },

  View: (req, res) => {
    //const user = new User(res);

    User.find((err, users) => {
      if (err) {
        //console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        //console.log(users);
        // users = [ { name, email, ..., image: { data: 'weird string' } }, { name, email, ... }, ... ]
        const images = users.map((user) => {
          return { data: user.image.data.toString("base64") };
        });
        console.log(images); 
        // images = [ { data: 'base64 string' }, { data: 'another base64 string'}, ... ]
        res.render("users/Image", { images: images });
      }
    });
  },
};

module.exports = UsersController;
