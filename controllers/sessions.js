var User = require('../models/user');
var bcrypt = require('bcrypt'); 

var SessionsController = {
  New: function(req, res) {
    res.render('sessions/new', {});
  },

  Create: function(req, res) {
    console.log('trying to log in')
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email}).then(user => {
       
        if (!user) return res.render("error_User")
   
        bcrypt.compare(password, user.password, (err, data) => {
            if (err) throw err
          
            if (data) {
              req.session.user = user;
              res.redirect('/posts');

            } else {
                return res.render("error_password")
            }

        })

    })
  },

  Destroy: function(req, res) {
    console.log('logging out')
    if (req.session.user && req.cookies.user_sid) { 
      res.clearCookie('user_sid');
    }
    res.redirect('/sessions/new');
  }
};

module.exports = SessionsController;

