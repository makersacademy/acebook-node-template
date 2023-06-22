function requireLoggedOut(req, res, next) {
    if (req.session.user) {
        return res.redirect('/posts');
    } else {
        return next();
    }
}

module.exports = requireLoggedOut;