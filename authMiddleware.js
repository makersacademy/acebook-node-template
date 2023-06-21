function isAuthenticated(req, res, next) {
    if (req.session.user) {
      // The user is authenticated.
        next();
    } else {
      // The user is not authenticated. Redirect to the login page.
        res.redirect('/');
    }
}

module.exports = isAuthenticated;