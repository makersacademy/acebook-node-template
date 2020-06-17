if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const PostsController = require('../controllers/posts');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('../passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

const users = [];

// const Users = require('../models/users');
router.use(express.urlencoded({extended: false}));
router.use(flash())
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize());
router.use(passport.session());

// const HomeController = require('../controllers/home');

// router.get('/', (req, res) => {
//   res.render('index.ejs', {name: req.user.name});
// });

router.get('/', PostsController.Index);

router.get('/sign_up', (req, res) => {
  res.render('sign_up.ejs');
});

router.post('/sign_up', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // const users = new Users(req.body);
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
  console.log(users);
});

router.get('/sign_in', (req, res) => {
  res.render('sign_in.ejs');
});

router.post('/sign_in', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/sign_in',
  failureFlash: true
}));

// router.get('/', HomeController.Index);
// router.listen(3030);

module.exports = router;
