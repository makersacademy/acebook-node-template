var Content = require('../models/content');

//var App = require('../app');
//session = App.session;

var ContentController = {
  Index: async (req, res) => {
    // display all posts in descending order
    await Content.
      find({}).
      populate('user').
      sort({ createdAt: 'desc' }).
      exec((err, post) => {
        if (err) { throw err; }
        if (!req.session.user) {
          return res.status(401).redirect('/');
        }
        else {
          res.render('dashboard/index', {
            content: post,
            username: req.session.user.username,
            createdAt: new Date().toLocaleString().slice(0, 10)
          });
        }
      })
  },
  UserIndex: async (req, res) => {
    var userID = req.session.user._id;
    await Content.
            find({user: userID}).
            sort({ createdAt: 'desc' }).
            exec((err, post) => {
      if (err) { throw err; }
      if (!req.session.user){
        return res.status(401).redirect('/');
      }
      else{
        res.render('dashboard/myposts', {
          user: post,
          username: req.session.user.username,
          createdAt: new Date().toLocaleString().slice(0,10)
        });
      }
    })
  },
  New: function(req, res) {
    if (!req.session.user){
      return res.status(401).redirect('/');
    }
    else{
      res.render('dashboard/new', {
        content: new Content(),
        title: 'Add new post'
      });
  }},
  Create: async (req, res) => {
    const post = req.body.post;

    req.session.user.posts.push(post)

    const content = new Content({
      post: post,
      user: req.session.user._id
    });

    await content.save((err) => {
      if (err) {
        res.redirect('dashboard/new');
      } else {
        res.status(201).redirect('/dashboard');
      }
    });
  }
};

module.exports = ContentController;