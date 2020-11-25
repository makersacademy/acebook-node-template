var User = require('../models/user');
const bcrypt = require('bcrypt');

var HomeController = {
  Index: function(req, res) {
    res.render('home/index', { title: 'Acebook' });
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
    var user = User.findOne({ name: req.body.username }).exec();
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if(!bcrypt.compare(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        res.send({ message: "The username and password combination is correct!" });
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
  }
};

module.exports = HomeController;
