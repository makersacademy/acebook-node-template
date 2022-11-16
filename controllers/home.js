// const Post = require('../models/post')

const HomeController = {
  Index: (req, res) => {
    //  if user has an open session, show "You're logged in", else show "You need to log in"
    if (req.session.user) {
      res.render('home/index', { title: 'Acebook', newUser: false, current_user: req.session.user.first_name })
    } else {
      res.render('home/index', { title: 'Acebook', newUser: true })
    }
  }
}

module.exports = HomeController
