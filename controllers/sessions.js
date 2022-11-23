const User = require('../models/user')
var bcrypt = require('bcrypt')

const SessionsController = {
  New: (req, res) => {
    if (req.session.user) {
      res.redirect('/posts')
    } else {
      res.render('sessions/new', { newUser: true })
    }
  },

  Create: (req, res) => {
    console.log('trying to log in')
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email }).then((user) => {
      if (!user) {
        res.redirect('/sessions/new')
        console.log(password)
        console.log(user.password)
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            throw err
          }

          if (result === true) {
            req.session.user = user
            res.redirect('/posts')
          } else {
            res.redirect('/sessions/new')
          }
        });
      }
    })
  },

  Destroy: (req, res) => {
    console.log('logging out')
    if (req.session.user && req.cookies.user_sid) {
      res.clearCookie('user_sid')
    }
    res.redirect('/sessions/new')
  }
}

module.exports = SessionsController
