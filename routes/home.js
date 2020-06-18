if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const HomeController = require('../controllers/home');

router.use(express.urlencoded({extended: false}));
router.use(flash());
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride('_method'));

router.get('/', HomeController.CheckAuthenticated, HomeController.Index);
router.get('/sign_up', HomeController.CheckNotAuthenticated,
    HomeController.UserSignUp);
router.post('/sign_up', HomeController.CheckNotAuthenticated,
    HomeController.SignUp);
router.get('/sign_in', HomeController.CheckNotAuthenticated,
    HomeController.UserSignIn);

router.post('/sign_in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign_in',
  failureFlash: true,
})),

router.delete('/sign_out', HomeController.SignOut);

module.exports = router;
