const User = require("../models/user");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const usernameExists = await User.findOne({ username: username });
      if (usernameExists) {
        return res
          .status(422)
          .render("users/new", { error: "Username already exists!" });
      }
      const emailExists = await User.findOne({ email: email });
      if (emailExists) {
        return res
          .status(422)
          .render("users/new", { error: "Email already exists!" });
      }

      let image = "";
      try {
        if (req.file) {
          console.log(req.file);
          const result = await cloudinary.uploader.upload(req.file.path);
          if (!result) {
            return res.status(500).send("An error occurred during upload.");
          }
          image = result.url;
        }
      } catch (error) {
        return res.status(500).send("An error occurred: " + error.message);
      }

      const user = new User({
        username,
        email,
        password,
        image,
      });

      await user.save();
      return res.status(201).redirect("/sessions/new");
    } catch (error) {
      res.status(400).render("users/new", {
        error: "An error occurred while creating the user.",
      });
    }
  },
};

module.exports = UsersController;
