const User = require("../models/user");
const bcrypt = require("bcrypt");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: async (req, res) => {
    const body = req.body;

    if (!(body.email && body.password)) {
      return res.status(400).send({ error: "Data not formatted properly" });
    }

    // creating a new mongoose doc from user data
    const user = new User(body);
    // salt password 10 times
    const salt = await bcrypt.genSalt(10);
    // set user password to hashed password
    user.password = await bcrypt.hash(user.password, salt);
    // user.save().then((doc) => res.status(201).send(doc));
    user.save().then(res.status(201).redirect("/posts"));
  },
};

module.exports = UsersController;
