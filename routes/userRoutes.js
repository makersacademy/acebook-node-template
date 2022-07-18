const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/user");
const router = express.Router();

// signup route
router.post("/signup", async (req, res) => {
  const body = req.body;
  if (!(body.email && body.password)) {
    return res.status(400).send({
      error: "Data not formatted properly",
    });
  }

  // creating a new mongoose document from user data
  const user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// login route
router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check that the user password with the
    // hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid Password" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

module.exports = router;
