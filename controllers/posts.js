var Post = require("../models/post");
const { cloudinary } = require("../cloudinary");
const { rawListeners } = require("../app");

var PostsController = {
  Index: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    Post.find(function(err, posts) {
      if (err) { throw err; }

      res.render('posts/index', { posts: posts });
    });
  },
  New: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    res.render('posts/new', {});
  },
  Create: async function(req, res) {
    var post = new Post(req.body);
		post.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    // post.user = req.user._id;
		await post.save(function(err) {
			console.log(post)
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
