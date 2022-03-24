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
      const current = await User.findOne({"_id": req.session.user._id}).populate('sent_requests')
      const users = await User.where({"_id": {$ne: req.session.user._id}})
                            .and({"_id": {$nin: current.sent_requests}})
                            .and({"_id": {$nin: current.friends}})
                            .and({"_id": {$nin: current.pending_friends}})

      res.render("users/userlist", { 
        users: users,
        awaiting_approval: current.sent_requests,
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
    const friends = await User.where({"_id": {$in: current.friends}}).populate('user')
    const awaiting_response = await User.where({"_id": {$in: current.sent_requests}}).populate('user')
    const pending_friends = await User.where({"_id": {$in: current.pending_friends}}).populate('user')

      res.render("users/friendlist", { 
          friends: friends,
          pending_friends: pending_friends,
          awaiting_response: awaiting_response,
          title: "Acebook Users",
          name: req.session.user.name,
          username: req.session.user.username
      });
    } catch (err) {
      console.log(err.messages);
    }
  },

  Profile: (req, res) => {
    res.render("users/profile", { 
      title: "Acebook",
      name: req.session.user.name,
      username: req.session.user.username,
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
      res.status(201).redirect("/users/userlist")
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

      res.status(201).redirect("/users/friendlist")
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

      res.status(201).redirect("/users/friendlist")
      
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

      res.status(201).redirect("/users/friendlist")
      } catch (err) {
        console.log(err.messages);
    }
  },
};



module.exports = UsersController;
