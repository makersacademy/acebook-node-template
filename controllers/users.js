const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          // Duplicate email
          return res
            .status(422)
            .send({ success: false, message: "Email already exists!" })
            .redirect("/users/new");
        }
        // Handle some other error
        return res.status(422).send(err);
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
