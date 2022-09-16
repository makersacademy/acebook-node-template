const User = require("../models/user");
const Resize = require("../middleware/resize");
const fs = require("fs");
const path = require("path");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    // check if the required details are submitted
    if (
      req.body.email == "" ||
      req.body.password == "" ||
      req.body.firstName == ""
    ) {
      res.render("users/new", { error: "Please enter the required details" });
    } else {
      const obj = {
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };

      if (req.file) {
        // save image
        const imagePath = path.join(__dirname, "../uploads");
        const fileUpload = new Resize(imagePath);
        const filename = await fileUpload.save(req.file);

        // load resized image
        const data = fs.readFileSync(path.join(imagePath, filename));

        obj.profilePic = {
          data: data,
          contentType: req.file.mimetype,
        };
      }

      const user = new User(obj);

      // check if user exists before creating
      User.findOne({ email: user.email }).then((found) => {
        if (found) {
          console.log(`User ${found.email} already exists!`);
          res.redirect("/");
        } else {
          user.save((err) => {
            if (err) {
              throw err;
            }
            // log in automatically after signup
            req.session.user = user;
            res.status(201).redirect("/posts");
          });
        }
      });
    }
  },
};

module.exports = UsersController;
