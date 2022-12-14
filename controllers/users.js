const User = require('../models/user')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const UsersController = {
  New: (req, res) => {
    res.render('users/new', { newUser: true })
  },

  Create: (req, res, next) => {
    console.log(req.file)
    
    const obj = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      DOB: req.body.DOB,
      email: req.body.email,
      password: req.body.password,
      profile_picture: {
        data: fs.readFileSync(path.join('./profile_pictures/' + req.file.filename)),
        contentType: 'image/png'
      }
    }
    
    const user = new User(obj)
    const email = user.email
    console.log(user)

    User.findOne({ email }).then((email) => {
      if (!email) {
        req.session.user = user
        user.save((err) => {
          if (err) {
            throw err
          }
          res.status(201).redirect('/posts')
        })
      } else if (user.email !== email) {
        res.redirect('/users/new')
      }
    })
  },
  View: (req, res) => {
    User.find({}, (err, items) => {
      if (err) {
          console.log(err)
          res.status(500).send('An error occurred', err)
      } else {
        console.log(users);
        const image = users.map((user) => {
          return {data: user.profile_picture.data.toString('base64')}
        })
          
        res.render('/profile_picture', { image: image })
      }
  })
  }
}

module.exports = UsersController
