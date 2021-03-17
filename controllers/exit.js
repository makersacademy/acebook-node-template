var ExitController = {
  Index: function(req, res) {
    if (req.session.user && req.cookies.user_sid) {
       res.clearCookie('user_sid');
       res.redirect('/');
    } else {
        res.redirect('/login');
     }
  }
};

module.exports = ExitController;