const User = require("../models/user");
const Helpers = require("../helpers/helpers");
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
    console.log("REGISTRTION PROFILE" + filename)
     
    if (filename != null){
        const user = new User ({
        name: req.body.name,
        username: req.body.username,
        image: filename,
        password: req.body.password,
        email: req.body.email
            
      })
      await user.save((err) => {
        if (err) {
          throw err;
        }
        req.session.user = user;
        res.status(201).redirect("/posts");
      });
    }else{
       const user = new User ({
        name: req.body.name,
        username: req.body.username, 
        password: req.body.password,
        email: req.body.email
      })   
      await user.save((err) => {
        if (err) {
          throw err;
        }
        req.session.user = user;
        res.status(201).redirect("/posts");
      });

    }

    // const user = new User ({
      
    //     name: req.body.name,
    //     username: req.body.username,
    //     image: filename,
    //     password: req.body.password,
    //     email: req.body.email
    //   })
    
    // user.save((err) => {
    //   if (err) {
    //     throw err;
    //   }
    //   req.session.user = user;
    //   res.status(201).redirect("/posts");
    // });
  },

  Profile: (req, res) => {
    res.render("users/profile", { 
      title: "Acebook",
      id: req.session.user._id,
      name: req.session.user.name,
      username: req.session.user.username,
      bio: req.session.user.bio,
      image: req.session.user.image,
    });
  },

  Addfriend: async (req, res) => {
    try{
      const requestingUser = await User.findOne({'_id': req.session.user._id});
      const receivingUser = await User.findOne({'_id': req.body.friendReqId});
      requestingUser.sent_requests.unshift(req.body.friendReqId)
      receivingUser.pending_friends.unshift(req.session.user._id);
      requestingUser.sent_requests = requestingUser.sent_requests.filter((value,index) => requestingUser.sent_requests.indexOf(value) === index);
      receivingUser.pending_friends = receivingUser.pending_friends.filter((value,index) => receivingUser.pending_friends.indexOf(value) === index);
      await requestingUser.save();
      await receivingUser.save();
      res.status(201).redirect("/profile/userlist")
    } catch {
        console.log("error")
    }
  },

  Acceptfriend: async (req, res) => {
    try{
      const receivingUser = await User.findOne({'_id': req.session.user._id});
      const requestingUser = await User.findOne({'_id': req.body.friendAccId});

      requestingUser.sent_requests = Helpers.RemoveIDFromArray(requestingUser.sent_requests, req.session.user._id);
      receivingUser.pending_friends = Helpers.RemoveIDFromArray(receivingUser.pending_friends, req.body.friendAccId);    
      
      receivingUser.friends.unshift(req.body.friendAccId);
      requestingUser.friends.unshift(req.session.user._id);
  
      await receivingUser.save();
      await requestingUser.save();
  
      res.status(201).redirect("/profile/friendlist")
      } catch (err) {
        console.log(err)
    }
  },
  
  Rejectfriend: async (req, res) => {
    try{
      const user = await User.findOne({"_id": req.session.user._id});
      const rejectedFriend = await User.findOne({"_id": req.body.friendRejId})

      user.pending_friends = Helpers.RemoveIDFromArray(user.pending_friends, req.body.friendRejId);
      rejectedFriend.sent_requests = Helpers.RemoveIDFromArray(rejectedFriend.sent_requests, req.session.user._id);

      await user.save();
      await rejectedFriend.save();
  
      res.status(201).redirect("/profile/friendlist")
      
    } catch (err) {
      console.log(err)
    }
  },

  Deletefriend: async (req, res) => {
    try{
      const user = await User.findOne({'_id': req.session.user._id});
      const deletedFriend = await User.findOne({'_id': req.body.friendDelId});
      
      user.friends = Helpers.RemoveIDFromArray(user.friends, req.body.friendDelId)
      deletedFriend.friends = Helpers.RemoveIDFromArray(deletedFriend.friends, req.session.user._id)

      await user.save();
      await deletedFriend.save();

      res.status(201).redirect("/profile/friendlist")
      } catch (err) {
        console.log(err.messages);
    }
  },

  UpdateProfile: async (req,res) => {
   try{
    const filename = req.file != null ? req.file.filename : null;
    const user = await User.findOne({'_id': req.session.user._id});
    user.bio = req.body.bio
    user.name = req.body.name
   if (filename != null){
    user.image = filename
    req.session.user.image = filename 
  }

    const updatedProfile = await user.save()
    req.session.user.bio = req.body.bio
    req.session.user.name = req.body.name
    req.flash('success', 'User profile has been updated')

    res.status(201).redirect("/profile")
      } catch (err) {
        console.log(err);
    }
  },
};

module.exports = UsersController;
