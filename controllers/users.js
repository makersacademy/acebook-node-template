var User = require('../models/user');
const bcrypt = require('bcrypt');

var UsersController = {
  Signup: function(req, res){
    res.render('users/index', { messages: req.flash('err')});
  },
  CreateUser: async function(req, res){
    console.log(req.body);
    const { email, password, username, bio, profilePicture } = req.body;
    const hash = await bcrypt.hash(password, 12); 

    var checkEmail = await User.findOne({ email });
    if (checkEmail) {
      req.flash('err', 'This email is already registered');
      return res.status(400).redirect('/users/signup');
    }
    var checkUsername = await User.findOne({ username });
    if (checkUsername){
      req.flash('err', 'This username is already registered');
      return res.status(400).redirect('/users/signup');
    } 

    var user = new User( {
      email,
      password: hash,
      username,
      bio,
      profilePicture
    });
    
    console.log(user);

    await user.save(function(err){
      if (err) { 
        throw err 
      }
      
      res.status(201).redirect('/users/welcome');
    });
  },
  Welcome: function(req, res){
    res.render('users/welcome', {});
  },
  Login: function(req, res){
    res.render('users/login', { messages: req.flash('logstatus')});
  },
  Authenticate: async function(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    if(validPassword){
      req.session.user_id = user._id;
      res.redirect('/posts');
    } 
    else{
      req.flash('logstatus', 'Your credentials are incorrect, please try again');
      res.redirect('/users/login');
    }
  },
  LogOut: function(req, res){
    req.session.user_id = null;
    if (req.session.user_id === null){
      req.flash('logstatus', 'You have sucessfully logged out');
      res.redirect('/users/login');
    }
  },

  Profile: async (req, res) => {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    const user = await User.findById(req.session.user_id);
    res.render('users/profile', {Title: 'Profile Page', user: user});
  },

  EditBio: async (req, res) => {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    const user = await User.findById(req.session.user_id);
    res.render('users/edit', { Title: 'Edit Bio', user: user});
  },

  UpdateBioDB: async (req,res) => {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    console.log(req.body)
    const user = await User.findByIdAndUpdate(req.session.user_id, {bio: req.body.message, profilePicture: req.body.profilePic.url});
    console.log(user)
    res.status(201).redirect(`/users/${user._id}`);
  },

}

module.exports = UsersController;