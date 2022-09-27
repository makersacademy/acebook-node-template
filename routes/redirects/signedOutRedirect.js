const signedOutRedirect = (req, res, next) => {
    if (req.session.signedIn === false) {

        res.redirect("/sessions/new");
    } else {
      next();
    }
  };

module.exports = signedOutRedirect;
