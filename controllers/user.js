var User = require('../models/user')
const bcrypt = require('bcrypt'); 


var UserController = {
  New: function(req, res){
    //nothing inside
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
      if (err) { 
        res.send({
          success: false,
          message: "db server error!",
        })}
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
          if (err) { 
            res.send({
              success: false,
              message: "db server error!",
            })}
            res.send(false)  
        });
      }
    });
  }, 

  Index: function(req,res){
    //nothing inside
  },

  Authenticate: function(req, res){

    const { body } = req;

    const {
      email,
      password
    } = body; 
    

    User.findOne({email: email}, async function(err, existingUser) {
      if (err) {
        res.send({
          success: false,
          message: "db server error!",
        })}
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
