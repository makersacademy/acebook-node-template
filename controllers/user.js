var User = require('../models/user');


Create: function(req, res) {
  var post = new Post(req.body);
  post.save(function(err) {
    if (err) { throw err; }

    res.status(201).redirect('/user');
  });
}
