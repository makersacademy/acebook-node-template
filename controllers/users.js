const User = require('../models/user')

const UsersController = {
  New: (req, res) => {
    res.render('users/new', {})
  },

  Create: (req, res) => {
    const user = new User(req.body)
    const email = user.email

    User.findOne({ email }).then((email) => {
      if (!email) {
        req.session.user = user
        res.redirect('/posts')
      } else if (user.email !== email) {
        res.redirect('/users/new')
      }
    })
  }
}

module.exports = UsersController
