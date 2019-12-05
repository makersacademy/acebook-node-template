var Post = require('../models/post');
var User = require('../models/user');

var PostsController = {
  Index: async function(req, res) {
    if(!req.cookies.userId) {
      res.redirect("/");
    }
    let findPosts = Post.find(function(err, posts) {
      if (err) { throw err; }
      return posts;
    });

    let findUser = (userId) => User.findOne({_id: userId}, function(err, user) {
      if (err) { throw err; }
      return user;
    });

    res.render('posts/index', { 
      user: await findUser(req.cookies.userId),
      data: await findPosts,
    });
  },

  New: function(req, res) {
    res.render('posts/new', {});
  },
  Create: async function(req, res) {
    var today = new Date();
    var date = today.toDateString();
    var time = today.toTimeString().slice(0,8);
    var timeDate = time + ' ' + date;
    const findUser = (userId) => User.findOne({_id: userId}, function(err, user) {
      if (err) { throw err; }
      return user;
    });

    let loggedInUser = await findUser(req.cookies.userId)

    var post = new Post({ 
      message: req.body.message, 
      timeDate: timeDate,
      userId: req.cookies.userId,
      user: `${loggedInUser.firstName} ${loggedInUser.surname}`
    });
    post.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
    });
  }
};

module.exports = PostsController;
