var Post = require("../models/post");

var PostsController = {
  Index: function(req, res) {
    if (!req.session.user_id){
      res.redirect('/users/login')
    }
    // Post.find(function(err, posts) {
    //   if (err) { throw err; }

		Post.find({}, null, {sort :{createdAt : 'desc'}}, function(err, posts) {
      if (err) { throw err; }
      res.render('posts/index', { posts: posts});
		})
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

	EditPage: function (req, res) {
		res.render("posts/edit", { message: req.body.message, id: req.params.id });
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
	Search: async function(req, res) {
    const  postsSearch = req.query.search
     await Post.find({$text: {$search: postsSearch }}, function(err, postsSearch) {
			if (err) { 
				throw err; 
			}
				res.render("posts/search", { postsSearch: postsSearch })
		})
	}

};

module.exports = PostsController;
