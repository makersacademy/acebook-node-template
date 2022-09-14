const User = require("../models/user");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    console.log(req.body);
    console.log("Attempting to sign up new user");
    const newUserUsername = req.body.username;
    const newUserEmail = req.body.email;

    // see if username or email match any existing users
    User.find(
      { $or: [{ username: newUserUsername }, { email: newUserEmail }] },
      (err, result) => {
        if (err) {
          // do something if err
          throw err;
        } else if (result.length) {
          // return an object for relevant error messages in DOM if they match
          let usernameExists = false;
          let emailExists = false;
          if (result.filter((user) => user.username === newUserUsername).length)
            usernameExists = true;
          if (result.filter((user) => user.email === newUserEmail).length)
            emailExists = true;
          res.send(
            JSON.stringify({
              content: {
                usernameExists: usernameExists,
                emailExists: emailExists,
              },
            })
          );
        } else {
          // create a new user if username and email are unique
          // console.log("they are unique");
          const user = new User(req.body);
          user.save((err) => {
            if (err) {
              throw err;
            }
            res.send(JSON.stringify({ ok: true }));
          });
        }
      }
    );
  },
};

module.exports = UsersController;
