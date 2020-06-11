var user = require('../models/user')
var userSession = require('../models/userSession')

var UserController = {
 
  New: function(req, res){
    User.findOne({_id: req.body.id}, async function(err, existingUser){
      console.log(existingUser)
      res.send(existingUser)
    })
  },

  Create: function(req, res){

    const { body } = req;

    const {
      firstName,
      lastName,
      email,
      password
    } = body; 


    user.findOne({email: email}, async function(err, existingUser) {
      if (err) { 
        res.send({
          success: false,
          message: "db server error!",
        })}
      else if (existingUser !== null ) {
        res.send(existingUser);
      }
      else{
        const newUser = new user();
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
          console.log(newUser)
          res.send(false)  
        });
      }
    });
  }, 

  Index: function(req,res){
    //
  },

  Authenticate: function(req, res){

    const { body } = req;

    const {
      email,
      password
    } = body; 
    

    user.findOne({email: email}, async function(err, existingUser) {
      if (err) {
        res.send({
          success: false,
          message: "db server error!",
        })}
      else if (existingUser !== null ) {
          if (existingUser.validPassword(password)) {
  
            const userSessionNew =  new userSession();
            userSessionNew.userId = existingUser._id
            userSessionNew.save((err,doc)=> {
              if (err) { 
                res.send({
                success: false,
                message: "db server error!",
              })}  //res.json(existingUser)
              return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
              })
            })
          } 
          else {
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
