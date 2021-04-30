var Post = require("../models/post");
var Comment = require("../models/comment");
var User = require("../models/user");

var PostsController = {
	Index: function (req, res) {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}

		Post.find(async function (err) {
			if (err) {
				throw err;
			}
			const user = await User.findById(req.session.user_id);

			const posts = await Post.find({})
				.populate("author")
				.sort({ createdAt: "desc" })
        .populate("comments")
        .sort({ createdAt: "desc" })
        .populate({ path: "comments", populate: { path: "author" } });
			res.render("posts/index", { posts: posts, userId: user, title: 'Homepage'});
		});
	},
	New: function (req, res) {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}
		res.render("posts/new", {title: 'New Post'});
	},
	Create: async function (req, res) {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}
		var user = await User.findById(req.session.user_id);

		var newPost = new Post({
			message: req.body.message,
			author: user._id,
		});

		newPost.images = req.files.map((f) => ({
			url: f.path,
			filename: f.filename,
		}));

		newPost.save(function (err) {
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

	EditPage: async function (req, res) {
		const { id } = req.params;
		const post = await Post.findById(id);
		res.render("posts/edit", {
			post,
			message: req.body.message,
			id: req.params.id,
			title: 'Edit Page'
		});
	},

	Edit: function (req, res) {
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
	Search: async function (req, res) {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}
		const querySearch = req.query.search;
		var postCollection = [];
		var userCollection = [];
		await Post.find( 
			{ message: { $regex: `${querySearch}`, $options: "i" } },
			async function (err, result) {
				if (err) {
					throw err;
				} else {
					let i;
					for (i = 0; i < result.length; i++) {
						postCollection.push(result[i]);
					}
				}
			}
		);
		await User.find(
			{ $or: [{ username: { $regex: `${querySearch}`, $options: "i" } }, { bio: { $regex: `${querySearch}`, $options: "i" } }] },
			async function (err, result) {
				if (err) {
					throw err;
				} else {
					let i;
					for (i = 0; i < result.length; i++) {
						userCollection.push(result[i]);
					}
				}
			}
		);

		let searchResultMsg = "Results found: ";

		if (postCollection.length <= 0 && userCollection.length <= 0) {
			searchResultMsg = "There are no search results"
		}
		res.render("posts/search", {
			postCollection: postCollection,
			userCollection: userCollection,
			resultError: req.flash("noResults"),
			title: 'Search Results',
			searchResultMessage: searchResultMsg
		});
	},

  Comment: function (req, res) {
    Post.findById(req.params.id, (err, post) => {
      var comment = new Comment(req.body);
      comment.author = req.session.user_id;
      comment.save((saveErr) => {
        if (saveErr) {
          throw saveErr;
        }
        post.comments.push(comment);
        post.save((postErr) => {
          if (postErr) {
            throw postErr;
          }
          res.status(201).redirect("/posts");
        });
      });
    });
  },

  DeleteComment: function (req, res) {
    var comment = Comment.findById(req.params.id);
    console.log(comment.id);
    comment.deleteOne(function (err) {
      if (err) {
        throw err;
      }
      res.status(201).redirect("/posts");
    });
  },
};

module.exports = PostsController;
