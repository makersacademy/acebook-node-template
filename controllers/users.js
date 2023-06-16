const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

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
          console.log(req.file.path);
          const result = await cloudinary.uploader.upload(req.file.path);

          if (!result) {
            return res.status(500).send("An error occurred during upload.");
          }
          image = result.url;
        }
      } catch (error) {
        console.log("error!");
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
