var User = require('../models/user');
var Post = require('../models/post')

var UsersController = {
  New: function(req, res) {
    res.render('users/new', { layout: '/layoutUsersNew' });
  },

  Profile: function(req, res) {
    var OrderedPost = Post.find().sort( { createdAt : -1 } )
    OrderedPost.find({postedBy: req.session.user._id})
    .then(posts => {
      res.render('users/profile', {posts: posts, user: req.session.user})
    })
  },


  Create: function(req, res) {
    var user = new User({
      email: { type: req.body.email },
      password: req.body.password,
      firstname: req.body.firstname,
      surname: req.body.surname,
      profilePicture: '/images/default-profile-picture.jpeg'
    });
    user.save(function(err) {
      if (err) { throw err; }
      res.status(201).redirect('/posts');
      console.log(req.body)
    });
  },


  UploadPicture: function(req, res) {

    User.findByIdAndUpdate(
      req.session.user._id, 
      { profilePicture: '/images/' + req.file.filename }, 
      {new:true}, 
      function(err, user) {
        if (err) { throw err; }
        req.session.user = user;
        res.status(201).redirect('/users/profile');
      }
    );
    
  }
};

module.exports = UsersController;
