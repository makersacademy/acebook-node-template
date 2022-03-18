const User = require("../models/user");
const bcrypt = require("bcrypt");

const UsersController = {
  New: (req, res) => {
    res.render("users/new", {messages: req.flash('err')});
  },

  Create: (req, res) => {

    console.log("1")
    
// Check email address is valid - taken from https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Check password has at least one capital letter - taken from https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
    const passwordValidator = /.*[A-Z].*/
    const email = req.body.email;
    const password = req.body.password;

//  Use connect-flash for error messages - https://stackoverflow.com/questions/37706141/how-can-i-delete-flash-messages-once-a-page-has-loaded-using-express

    if ((emailValidator).test(email) === false) {
			req.flash('err', 'You must provide a valid email address')
      return res.status(400).redirect('/users/new');
		}
    if ((passwordValidator).test(password) === false) {
			req.flash('err', 'Your password must have a least one capital letter')
      return res.status(400).redirect('/users/new');
		}

    // checkEmail = ""
//     console.log("checker is " + checkEmail)

//     checkEmail = User.findOne({ email: email }); 
//       if (checkEmail) {
//         req.flash('err', 'This email is already registered');
//         console.log("And now checkEmail is " + checkEmail.user);
//         checkEmail = "";
//         return res.status(400).redirect('/users/new');
//       }
   
    // User.findOne({ email: email }).then((userFound) => {
    //   if (userFound) {
    //     req.flash('err', 'This email is already registered');
    //     return res.status(400).redirect('/users/new');
    //   }
    // });

    if (password.length < 6) {
        req.flash('err', 'Your password must be at least 6 characters long')
        return res.status(400).redirect('/users/new');
    } 
    
    const hash = bcrypt.hashSync(password, 12);
    req.body.password = hash
    const user = new User(req.body);
    
    user.save((err) => {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },

  Profile: (req, res) => {
    console.log(req.session.user._id);
    res.render("users/profile", { 
          title: "Acebook",
          name: req.session.user.name,
          username: req.session.user.username,
    });
  },
};

module.exports = UsersController;
