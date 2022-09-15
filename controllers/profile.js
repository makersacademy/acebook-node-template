const User = require("../models/user");
const Resize = require("../middleware/resize");
const fs = require("fs");
const path = require("path");

const ProfileController = {
  Index: (req, res) => {
    User.findOne({ _id: req.session.user._id }).then((user) => {
      if (user.profilePic.data) {
        user.profilePic.data = user.profilePic.data.toString("base64");
      }
      res.render("profile/index", {
        title: "Acebook",
        firstName: user["firstName"],
        profilePic: user["profilePic"],
        lastName: user["lastName"],
        email: user["email"],
        password: "*".repeat(user["password"].length),
      });
    });
  },

  Edit: (req, res) => {
    console.log("profile/edit POST", req.body);

    User.findOne({ _id: req.session.user._id }).then((user) => {
      if (user.profilePic.data) {
        user.profilePic.data = user.profilePic.data.toString("base64");
      }
      res.render("profile/edit", {
        title: "Acebook",
        firstName: user["firstName"],
        profilePic: user["profilePic"],
        lastName: user["lastName"],
        email: user["email"],
        password: "*".repeat(user["password"].length),
      });
    });
  },

  EditUser: async (req, res) => {
    let newDetails = req.body;
    let currentUser = req.session.user;

    const existingUser = await User.findOne({ email: currentUser.email });

    const keys = ["email", "password", "firstName", "lastName"];

    keys.forEach((key) => {
      if (newDetails[key] != "") {
        existingUser[key] = newDetails[key];
      }
    });

    if (req.file) {
      // save image
      const imagePath = path.join(__dirname, "../uploads");
      const fileUpload = new Resize(imagePath);
      const filename = await fileUpload.save(req.file);

      // load resized image
      const data = fs.readFileSync(path.join(imagePath, filename));

      existingUser.profilePic = {
        data: data,
        contentType: req.file.mimetype,
      };
    }

    req.session.user = existingUser;
    await existingUser.save();

    res.status(201).redirect(`/profile`);
  },
};

module.exports = ProfileController;
