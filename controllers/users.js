var User = require("../models/user");
var Post = require("../models/post");
const bcrypt = require("bcrypt");

var UsersController = {
	Signup: function (req, res) {
		res.render("users/index", {messages: req.flash('err'), title: 'Sign Up'});
	},
	CreateUser: async function (req, res) {
		const { email, password, username, bio, profilePicture } = req.body;
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    const passwordValidator = /.*[0-9].*/
    
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
		if ((emailValidator).test(email) === false) {
			req.flash('err', 'You must provide a valid email address')
      return res.status(400).redirect('/users/signup');
		}
    if ((passwordValidator).test(password) === false) {
			req.flash('err', 'Your password must have a least one number')
      return res.status(400).redirect('/users/signup');
		}
		if (password.length < 6) {
      req.flash('err', 'Your password must be at least 6 characters long')
      return res.status(400).redirect('/users/signup');
		} else {
			const hash = await bcrypt.hash(password, 12);
    
			var user = new User({
				email,
				password: hash,
				username,
				bio,
        profilePicture
			});

      await user.save(function(err){
        if (err) { 
          throw err 
        }
      res.status(201).redirect('/users/login');
     });
    }
  },

  Welcome: function(req, res){
    res.render('users/welcome', {title: 'Welcome'});
  },
  Login: function(req, res){
    res.render('users/login', { messages: req.flash('logstatus'), title: 'Log In'});
  },
  Authenticate: async function(req, res){
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
      req.flash('logstatus', 'Your credentials are incorrect, please try again');
      res.redirect('/users/login');
    }
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
  EditBio: async (req, res) => {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    const user = await User.findById(req.session.user_id);
    res.render('users/edit', { title: 'Edit Profile', user: user});
  },

  UpdateBioDB: async (req,res) => {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    console.log(req.body)
    const user = await User.findByIdAndUpdate(req.session.user_id, {bio: req.body.message, profilePicture: req.body.profilePic});
    console.log(user)
    res.status(201).redirect(`/users/${user._id}`);
  },
	Profile: async (req, res) => {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}
    const user = await User.findById(req.session.user_id);
    const userPosts = await Post.find({ author: { _id:  req.session.user_id }}).sort({createdAt: 'desc'}).populate({ path: "comments", populate: { path: "author" } });
    res.render("users/profile", { Title: "Profile Page", user: user, userPosts: userPosts });
	},

};

module.exports = UsersController;
