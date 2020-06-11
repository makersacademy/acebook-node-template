var User = require('../models/user')
const bcrypt = require('bcrypt'); //lib for bcryption


var UserController = {
  New: function(req, res){
    res.render('posts/new', {});
    //res.status(201).redirect('/api/user/new')

    // the 'user/new' is referring to the new.hbs file in the views > user folder

  },

  Create: function(req, res){
    console.log("we are here")
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
        console.log('user exist')
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
          console.log('user added')
          res.send(false)  
        });
      }
    });
  },

  Index: function(req,res){
    res.render('user/login',{});
  },

  Authenticate: function(req, res){
    console.log("WE ARE İN AUTHENTİCATE")
    User.findOne({email: req.body.email}, async function(err, user) { // mongo function
      if (err) {throw err;}
      if (user) {
        //TODO: REFACTOR LATER
        //USER PASSWORD: 1234   == //HASHEDPASSWORD: AŞKSDFŞL1234ASFJKLAFLKFA
        if (await bcrypt.compare(req.body.password, user.password)) {
          console.log("USER LOGIN")
          console.log(user)
          res.json(user)
          //res.render('posts/index', { msg:"Welcome " + data.firstName + " ! " })
          // res.render('posts/index', { msg:"Welcome " + data.firstName + " ! " })
          // res.status(201).redirect('/user/new')
        } else {
          console.log("WRONG PASSWORD")
          // res.render('user/login', { msg:'user password wrong' });
          res.json("wrong password")

        }
      }
      else{
        console.log("NO USER WİTH TAHT EMAİL")
        res.render('user/login', { msg:'No user with that email' });
      }
    })
  }

};

module.exports = UserController;
