var User = require('../models/signup');
var Response = require('../common/response');

var HomeController = {
  Index: function(req, res) {
    User.find(function(err) {
      if (err) { throw err; }
    res.render('home/index', { title: 'Acebook' });
  });
  },

Login: function(req, res) {
  User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
    if(err){
      console.log(err);
       Response.errorResponse(err.message,res);
    } console.log();
    if(!user){
      Response.notFoundResponse('Invalid Email Id or Password!',res);
    }else{
      req.session.user = user;
      // Response.successResponse('User loggedin successfully!',res,user);
      res.status(201).redirect('/posts'); 

    }
  });
  
}
}

module.exports = HomeController;

// User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
//   if (err) { 
//    return (err)
//   }
//   else if(user) {
//     res.status(201).redirect('/posts'); 
//   }
//   else {
//     return ('Invalid password').send;
//   }
// });