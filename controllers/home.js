var User = require('../models/user');

var HomeController = {

  Index: function(req, res) { 
    User.find(function(err, users) {
      if (err) { throw err; } 

      res.render('home/index', { title: 'Acebook', firstName: users});
    });
  },


};

module.exports = HomeController;






// req.session.user_id = 1 (Fry)
// users = arr of hash 





// redirect '/' if User.current_user == nil

      // var id = req.session.user_id
      // var name = ""
      
      // for(let index = 0; index < users.length; index++){
      //   if(users[index]._id === id){
      //     return name = users[index].firstName;
      //   }
      //   return name
      // }



      // var id = req.session.user_id
      // var name = ""
      
      // for(let index = 0; index < users.length; index++){
      //   if(users[index]._id === id){
      //     return name = users[index].firstName;
      //   }
      // }