const User = require("../models/user");
const bcrypt = require("bcrypt");


const UsersController = {

  New: (req, res) => {
    res.render("users/new", {messages: req.flash('err')});
  },

  Create:  async (req, res) => {
    
// Check email address is valid - taken from https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Check password has at least one capital letter - taken from https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
    const passwordValidator = /.*[A-Z].*/
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const filename = req.file != null ? req.file.filename : null;
   
   

//  Use connect-flash for error messages - https://stackoverflow.com/questions/37706141/how-can-i-delete-flash-messages-once-a-page-has-loaded-using-express

    if ((emailValidator).test(email) === false) {
			req.flash('err', 'You must provide a valid email address')
      return res.status(400).redirect('/users/new');
		}
    if ((passwordValidator).test(password) === false) {
			req.flash('err', 'Your password must have a least one capital letter')
      return res.status(400).redirect('/users/new');
		}

    let checkEmail = await User.findOne({ email });
    if (checkEmail) {
      req.flash('err', 'This email is already registered');
      return res.status(400).redirect('/users/new');
    }

    let checkUser = await User.findOne({ username });
    if (checkUser) {
      req.flash('err', 'This username is already taken');
     return res.status(400).redirect('/users/new');
    }

    if (password.length < 6) {
        req.flash('err', 'Your password must be at least 6 characters long')
        return res.status(400).redirect('/users/new');
    } 
  
    const hash = bcrypt.hashSync(password, 12);
    req.body.password = hash
    const user = new User ({
      
        name: req.body.name,
        username: req.body.username,
        image: filename,
        password: req.body.password,
        email: req.body.email
            
      })
    
    
    user.save((err) => {
      if (err) {
        throw err;
      }
      req.session.user = user;
      res.status(201).redirect("/posts");
    });
  },

  UserList: async (req, res) => {
    try{
    const current = await User.findOne({"_id": req.session.user._id})
    const users = await User.where({"_id": {$ne: req.session.user._id}}).where({"_id": {$nin: current.friends}})

      res.render("users/userlist", { users: users,
          title: "Acebook Users",
          name: req.session.user.name,
          username: req.session.user.username
      });
    } catch {
      console.log("error")
    }
  },

  FriendList: async (req, res) => {
    try{
    const current = await User.findOne({"_id": req.session.user._id})
    const users = await User.where({"_id": {$in: current.friends}}).populate('user')

      res.render("users/friendlist", { users: users,
          title: "Acebook Users",
          name: req.session.user.name,
          username: req.session.user.username
      });
    } catch {
      console.log("error")
    }
  },

  Profile: (req, res) => {
    // console.log(req.session.user._id);
    res.render("users/profile", { 
      title: "Acebook",
      name: req.session.user.name,
      username: req.session.user.username,
    });
  },

  Addfriend: async (req, res) => {
    try{
      const users = await User.findOne({'_id': req.session.user._id});
      users.friends.unshift(req.body.friendReqId);
      users.friends = users.friends.filter((value,index) => users.friends.indexOf(value) === index);
      users.save();
      res.status(201).redirect("/users/userlist")
      } catch {
        console.log("error")
    }
  },

  Deletefriend: async (req, res) => {
    try{
      const users = await User.findOne({'_id': req.session.user._id});
      let e = users.friends.length;
      console.log(e);
      const index = users.friends.indexOf(req.body.friendDelId);

      if (index > -1) {
        users.friends.splice(index, 1);
      }
      users.save();
      res.status(201).redirect("/users/friendlist")
      } catch (err) {
        console.log(err);
    }
  }  
};

module.exports = UsersController;
