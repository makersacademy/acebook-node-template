var User = require('../models/user');
const bcrypt = require('bcrypt');

var UsersController = {
  Signup: function(req, res){
    res.render('users/index', {});
  },
  CreateUser: async function(req, res){
    console.log(req.body);
    const { email, password, username, bio } = req.body;
    const hash = await bcrypt.hash(password, 12); 

    var user = new User( {
      email,
      password: hash,
      username,
      bio
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
    res.render('users/login', {});
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
      res.redirect('/users/login');
    }
  },
  LogOut: function(req, res){
    req.session.user_id = null;
    res.redirect('/users/login');
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
    const user = await User.findByIdAndUpdate(req.session.user_id, {bio: req.body.message});
    res.status(201).redirect(`/users/${user._id}`);
  },

}

module.exports = UsersController;