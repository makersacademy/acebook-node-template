var User = require('../models/user');
const bcrypt = require('bcrypt');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook', test: req.session.test });
  },
  Signup: function(req, res) {
    res.render('home/signup', { title: 'Acebook' });
  },
  Login: function(req, res) {
    res.render('home/login', { title: 'Acebook' });
  },
  Logout: function(req, res) {
    res.render('home/login', {title: 'Acebook' });
    //re.body.Status = false; find user in database and
    //change their status to false
  },
  LoginUser: function(req,res) {
    User.findOne({ name: req.body.username }).exec().then(data => {
      if(!data) {
          return res.status(400).send({ message: "Your username or password is incorrect" });
      }
      if(!bcrypt.compareSync(req.body.password, data.password)) {
          return res.status(400).send({ message: "Your username or password is incorrect" });
      }

      req.session.test = 'tomato';

      User.updateOne({ name: req.body.username}, {
        Status: true
      }, function(err, affected, resp) {
        console.log(resp);
      })
      res.status(201).redirect('/profile');
     });
  },
  CreateUser: function(req, res) {
    req.body.Gender = req.body.Gender[0] === "Other" ? req.body.Gender[1] : req.body.Gender[0]
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    req.body.Status = true;
    var user = new User(req.body);
    user.save(function(err) {
      if (err) { throw err; }

      res.status(201).redirect('/posts');
    });
  },
};

module.exports = HomeController;
