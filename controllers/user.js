var User = require('../models/user');
var bcrypt = require('bcrypt');

var UserController = {
Signup: function(req, res) {
  res.render('user/signup', {});
},

Create: function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    id: req.body.id

  });

  user.save(function(err) {
    if (err) {
      throw err;
    } else {
      req.session._id = user._id;
    res.render('user/index');
        //res.status(201).redirect('/');
        //res.redirect('home/index');
//res.render('home/index');


    }
  });
},
// } else if (req.body.logusername && req.body.logpassword){
//   User.authenticate(req.body.logusername, req.body.logpassword, function (error, user){
//     if (error || !user) {
//       var error = new Error('Wrong email or password.');
//       err.status = 401;
//       return next(err);
//     } else {
//       req.session.userId = user._id;
//       return res.redirect('/');
//     }
//   })
// }

  Authenticate: function(req, res, next){
    var form = req.body;
    User.findOne({username: form.username}, function(err, user){

      if (err) {
        throw err;
      }
      if (user) {
        if(form.password == user.password){
          res.cookie('userId', user.id);
          res.redirect("/posts");
        } else {
          res.redirect("/");
        }
      }
    })
    // .exec(function (error, user) {
    //   if (error) {
    //     return next(error);
    //   } else {
    //     if (user === null) {
    //       var err = new Error('You are not authorised.');
    //       err.status = 400;
    //       return next(err);
    //     } else {
    //       return res.send('<h1>Name: </h1>' + user.username + '<br><a type="button" href="/logout">Logout</a>')
    //     }
    //   }
    // })
  },

  Logout: function(req, res) {
    if (req.cookies.userId) {
      res.clearCookie('userId')
      //Deletes session object
        }
        res.redirect('/');
        }

    }



module.exports = UserController;
