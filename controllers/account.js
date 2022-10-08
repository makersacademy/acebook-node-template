const Image = require('../models/image')
const fs = require('fs')
const User = require('../models/user')
var path = require('path')
require('dotenv/config')

const AccountController = {
    Index: async (req, res) => {
    req.session.user = await User.findById(req.session.user._id).populate({path: 'friends', populate : {path: 'recipient'}});
    const incomingRequests = req.session.user.friends.filter(f => f.status === 2);
    await incomingRequests
    res.render("account/index", { title: "Account Page" , signedIn: req.session.signedIn, currentUser: req.session.user, requests:incomingRequests});
    },
    Profilepic: (req, res) => {

      var multer = require('multer');
      var storage = multer.diskStorage({
          destination: (req, file, cb) => {
              cb(null, 'public/profilepics')
          },
          filename: (req, file, cb) => {
              cb(null, file.fieldname + '-' + Date.now())
          }
      });
      var upload = multer({ storage: storage });

      var obj = {
          name: req.body.name,

          link: path.join('profilepics/' + req.file.filename)
      }
      Image.create(obj, async (err, item) => {
          if (err) {
              console.log(err);
          }
          else {
              item.save();
              const user = await User.findById(req.session.user._id);
              await User.updateOne(user, { $set: { profilepic: obj.link } });
            //   user.profilepic = obj.link
            //   user.save();
              res.redirect('account/index');
          }
      });
    }
  };

  module.exports = AccountController;
