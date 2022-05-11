const User = require("../models/user");

// Below is used for encrypting password
const CryptoJS = require('crypto-js');
const encryptWithAES = (text) => {
  var passphrase = process.env.SALT || '123';
  console.log(passphrase);
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};
// End of encryption

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {});
  },

  Create: (req, res) => {
    const user = new User({email: req.body.email, password: encryptWithAES(req.body.password)});
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = UsersController;
