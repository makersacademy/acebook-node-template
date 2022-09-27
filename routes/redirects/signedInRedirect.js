const signedInRedirect = (req, res, next) => {
    if (req.session.signedIn === true) {


        res.redirect("/posts");
    } else {
      next();
    }
  };

module.exports = signedInRedirect;
