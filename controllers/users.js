const User = require("../models/user");
const bcrypt = require("bcrypt");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const body = req.body;
    const user = new User(body);
    if (!(body.email && body.password)) {
      return res.status(400).send({
        error: "Data not formatted properly",
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    // problem lines (2)
    user.save().then((doc) => res.status(201).send(doc));
    res.status(201).redirect("/posts");
  },
  // Old one
  // Create: (req, res) => {
  //   const user = new User(req.body);
  //   user.save((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     res.status(201).redirect("/posts");
  //   });
  // },
};

module.exports = UsersController;
