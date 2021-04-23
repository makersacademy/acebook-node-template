var Post = require("../models/post");

var PostsController = {
	Index: function (req, res) {
		Post.find(function (err, posts) {
			if (err) {
				throw err;
			}

			res.render("posts/index", { posts: posts });
		});
	},
	New: function (req, res) {
		res.render("posts/new", {});
	},
	Create: function (req, res) {
		var post = new Post(req.body);
		post.save(function (err) {
			if (err) {
				throw err;
			}

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
		Post.find()
			.sort("-createdAt")
			.exec(function (err, posts) {
				if (err) {
					throw err;
				}
				res.render("posts/index", { posts: posts });
			});
	},

	UpdatePage: function (req, res, message) {
		res.render("posts/update", { message: req.body.message, id: req.params.id });
	},
	Update: function (req, res) {
		let post = Post.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: { message: req.body.message } },
			{ new: true },
			function (err, post) {
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
