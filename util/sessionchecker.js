module.exports = (req, res, next) => {
    if (!req.session.user?._id) {
      res.redirect("/sessions/new");
    } else {
      next();
    }
  };