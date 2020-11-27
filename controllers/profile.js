var User = require('../models/user');
var Post = require('../models/post');
const bcrypt = require('bcrypt');

var ProfileController = {
  Index: function(req, res) {
    User.findOne({ name: 'Giorgio Esposito'}).exec().then(data => {
      Post.find({owner: data.name}, function(err, posts) {
        if (err) { throw err; }

      res.render('profile/profile', { user: data, title: "Acebook", posts: posts });
    });
    })
  },
  Editor: function(req, res){
      res.render('profile/edit', {title: 'Acebook' });
  },
  EditUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    User.updateOne({ name: req.body.name}, {
      password: req.body.password,
      gender: req.body.Gender,
      Birthday: req.body.Birthday,


    }, function(err, affected, resp) {
      console.log(resp);
    })

      res.status(201).redirect('/profile');

  },
}
    module.exports = ProfileController;
