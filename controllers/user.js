var User = require('../models/user')
const bcrypt = require('bcrypt'); //lib for bcryption


var UserController = {
  New: function(req, res){
    res.render('posts/new', {});
    //res.status(201).redirect('/api/user/new')

    // the 'user/new' is referring to the new.hbs file in the views > user folder

  },

  Create: function(req, res){
    console.log("we are in CREATE")
    User.findOne({email: req.body.email}, async function(err, user) {
      if (err) { throw err; }
      if (user) {
        console.log('user exist')
        // console.log(data.email)
        // res.json(data.firstName);
        res.send(user);
        // window.location = "/user/login";
        // return json + url or route for login page
        //res.render('user/new', { msg:'user exist' });
        // res.status(201).redirect('/user/login')
      }
      else {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10) // 10 = salt structer = salt + password bcz if the passwords are same for both users, salt generates different values for every each time.
          var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: hashedPassword});
          user.save(function(err){
          if (err) { throw err; }
            //res.render('posts/index', { msg:"Welcome " + user.firstName + " ! " })
            //res.status(201).redirect('/api/posts')
            console.log('user added')
            // res.status(201).redirect('/api/user/new')
            res.send(false)
            
          });
        } catch {
          console.log('some db error')
         res.status(500).send();
        }
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
