var User = require('../models/user');
var Post = require('../models/post');
const bcrypt = require('bcrypt');

var ProfileController = {
  Index: function(req, res) {
    if(!req.session.test) {
      res.status(201).redirect('/')
    };
    User.findOne({ username: req.session.username}).exec().then(data => {
      Post.find({owner: data.name}, null, {sort: {date: -1}}, function(err, posts) {
        if (err) { throw err; }

      res.render('profile/profile', { user: data, title: "IceBook", posts: posts });
    });
    })
  },
  Editor: function(req, res){
      res.render('profile/edit', {title: 'IceBook' });
  },
  EditUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    User.updateOne({ username: req.session.username}, {
      name: req.body.name,
      password: req.body.password,
      gender: req.body.Gender,
      Birthday: req.body.Birthday,
      About: req.body.About,
    }, function(err, affected, resp) {
      console.log(resp);
    })

    Post.updateMany({ owner: req.session.name}, {
      owner: req.body.name,
    }, function(err, affected, resp) {
      console.log(resp);
    })

      req.session.name = req.body.name
      res.status(201).redirect('/profile');

  },
  Create: function(req, res) {


    req.body.owner = req.session.name;
    req.body.date = new Date();

      var post = new Post(req.body);
      post.save(function(err) {
        if (err) { throw err; }

        res.status(201).redirect('/profile');
      });
    }
}
    module.exports = ProfileController;
