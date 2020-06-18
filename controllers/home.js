const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('../passport-config');
initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id),
);

const users = [];

const HomeController = {
  Index: function(req, res) {
    res.render('home/index', {title: 'Acebook'});
  },

  UserSignUp: function(req, res) {
    res.render('sign_up.ejs');
  },

  SignUp: async function(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      users.push({
        id: Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.redirect('/sign_in');
    } catch {
      res.redirect('/sign_up');
    }
  },

  UserSignIn: function(req, res) {
    res.render('sign_in.ejs');
  },

  CheckAuthenticated: function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/sign_in');
  },

  CheckNotAuthenticated: function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  },

  SignOut: function(req, res) {
    req.logOut();
    res.redirect('/sign_in');
  },
};

module.exports = HomeController;

