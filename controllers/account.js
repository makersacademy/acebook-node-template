const AccountController = {
    Index: (req, res) => {
      res.render("account/index", { title: "Account Page" , signedIn: req.session.signedIn});
    }
  };
  
  module.exports = AccountController;