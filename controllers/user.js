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

      //req.session._id = user._id;


      req.session._id = user._id;
    res.redirect('/posts');
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
      console.log('This is the start of my error')
      console.log(err)
      console.log('This is the end of my error')
      if (err) {
        throw err;
      }
      if (!user){
        res.render('home/index', { error: 'Error: User not found' });
        // res.send("Error: user not found.")
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
