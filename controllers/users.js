const User = require("../models/user");

// Below is used for encrypting password
const CryptoJS = require('crypto-js');
const encryptWithAES = (text) => {
  var passphrase = process.env.SALT || '123';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
// End of encryption

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {user: req.session.user});
  },

  Create: (req, res) => {
    const user = new User({email: req.body.email, password: encryptWithAES(req.body.password),
                          first_name: req.body.first_name,
                          last_name: req.body.last_name,
                          dob: req.body.dob,
                          gender: req.body.gender,
                          home_town: req.body.home_town,
                          bio: req.body.bio,
         });
    user.save((err) => {
      if (err) {
        if (err.name === "ValidationError") {
          res.status(409).send("Email already in use");
        } else {
          res.status(400).send("Oops, something went wrong!");
        }
      } else {
        req.session.user = user;
        res.status(201).redirect("/posts");
      }
    });
  },

  Display: (req, res, next) => {

    const email = req.params.email

    User.findOne({email: email})
    .exec()
    .then(doc => {
        res.render('users/profile', {
            user: doc
        });
    })
  },
};

module.exports = UsersController;



