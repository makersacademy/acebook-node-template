var User = require('../models/user')
const bcrypt = require('bcrypt'); //lib for bcryption


var UserController = {
  New: function(req, res){
    res.render('user/new', {});
    // the 'user/new' is referring to the new.hbs file in the views > user folder
  },

  Create: function(req, res){
    User.findOne({email: req.body.email}, function(err, email) {
      if (err) { throw err; }
      if (email) {
        res.render('user/new', { msg:'user exist' });
      }
      else {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 = salt structer = salt + password bcz if the passwords are same for both users, salt generates different values for every each time.
          var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hashedPassword});
          user.save(function(err){
          if (err) { throw err; }
            res.render('posts/index', { msg:"Welcome " + user.firstName + " ! " })
          });
        } catch {
         res.status(500).send();
        }
      }    
    });  
  }, 

  Index: function(req,res){
    res.render('user/login',{});
  },

  Authenticate: function(req, res){
    User.findOne({email: req.body.email}, async function(err, data) { // mongo function
      if (err) {throw err;}
      if (data) {
        //TODO: REFACTOR LATER
        //USER PASSWORD: 1234   == //HASHEDPASSWORD: AŞKSDFŞL1234ASFJKLAFLKFA
        if (await bcrypt.compare(req.body.password, data.password)) {
          res.render('posts/index', { msg:"Welcome " + data.firstName + " ! " })
        } else {
          res.render('user/login', { msg:'user password wrong' });
        }
      }
      else{
        res.render('user/login', { msg:'No user with that email' });
      }
    })
  }
  
};

module.exports = UserController;
