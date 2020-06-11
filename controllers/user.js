var User = require('../models/user')
const bcrypt = require('bcrypt'); //lib for bcryption


var UserController = {
  New: function(req, res){
    res.render('posts/new', {});
    //res.status(201).redirect('/api/user/new')

    // the 'user/new' is referring to the new.hbs file in the views > user folder

  },

  Create: function(req, res){

    const { body } = req;

    const {
      firstName,
      lastName,
      email,
      password
    } = body; 


    User.findOne({email: email}, async function(err, existingUser) {
      if (err) { res.send({
        success: false,
        message: "db server error!",
      })
       }
      else if (existingUser !== null ) {
        res.send(existingUser);
      }
      else{
        var newUser = new User();
        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.hashedPassword(password)

        newUser.save(function(err){
          if (err) { throw err; }
            res.send(false)  
        });
      }
    });
  }, 

  Index: function(req,res){
    res.render('user/login',{});
  },

  Authenticate: function(req, res){

    const { body } = req;

    const {
      email,
      password
    } = body; 
    

    User.findOne({email: email}, async function(err, existingUser) {
      if (err) {throw err;}
      else if (existingUser !== null ) {
          if (existingUser.validPassword(password)) {
            res.json(existingUser)
        } else {
          res.json("wrong password")
        }
      }
      else{
        res.send({ 
          success: false,
          message:'No user with that email' 
        })
      }
    })
  }

};

module.exports = UserController;
