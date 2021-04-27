var Post = require("../models/post");
var User = require("../models/user");

var PostsController = {
  Index: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    Post.find(async function(err, posts) {
      if (err) { throw err; }
			const user = await User.findById(req.session.user_id);
      res.render('posts/index', { posts: posts, userId: user });
    });
  },
  New: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    res.render('posts/new', {});
  },
  Create: function(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
      if (err) { throw err; }
			res.status(201).redirect("/posts");
		});
	},
	Delete: function (req, res) {
		Post.findByIdAndRemove(req.params.id, function (err) {
			if (err) {
				throw err;
			}
			res.status(201).redirect("/posts");
		});
	},

	Sort: function (req, res) {
		Post.find().sort("-createdAt").exec(function (err, posts) {
				if (err) {
					throw err;
				}
				res.render("posts/index", { posts: posts });
			});
	},

	UpdatePage: function (req, res) {
		res.render("posts/update", { message: req.body.message, id: req.params.id });
	},

	Update: function (req, res) {
		Post.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: { message: req.body.message } },
			{ new: true },
			function (err) {
				if (err) {
					throw err;
				} else {
					console.log("Updated post");
					res.status(201).redirect("/posts");
				}
			}
		);
	},
};

module.exports = PostsController;
