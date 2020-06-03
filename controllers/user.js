var UserController = {
  Index:function(req, res){
    res.render('user/signup', { title: 'Signup to Acebook' }); // is this useruser grabbing entire instance
  }
}; 

module.exports = UserController;
