var Post = require("../models/post");
var User = require("../models/user");

var PostsController = {
	Index: function(req, res) {
		if (!req.session.user_id){
			res.redirect('/users/login')
		}
		// Post.find({}, null, {sort :{createdAt : 'desc'}}, async function(err, posts) {
		//   if (err) { throw err; }
		// 	const user = await User.findById(req.session.user_id);
		//   res.render('posts/index', { posts: posts, userId: user });
		// });

		Post.find(async function (err) {
			if (err) { throw err; }
			const user = await User.findById(req.session.user_id);
			const posts = await Post.find({}).populate('author').sort({createdAt: 'desc'});
			console.log(posts[0].author[0].username);
			console.log(posts[0].author);
			console.log(posts)
			// console.log(author)
			res.render("posts/index", { posts: posts, userId: user});
		});
	},

	New: async function (req, res) {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}
		await res.render("posts/new", {});
	},

	Create: async function (req, res) {
		if (!req.session.user_id) {
			res.redirect("/users/login");
		}
		var user = await User.findById(req.session.user_id);

		var newPost = new Post({
			message: req.body.message,
			author: (user._id)
		})
		
		newPost.save(function(err){
			if (err) { throw err }
			res.status(201).redirect('/posts');	
		});
		// res.status(201).redirect('/posts');
		// newPost.posts 
		// await	newPost.save(function(err){
    //   if (err) { 
    //     throw err 
    //   }
      
    //   res.status(201).redirect('/posts');
    // });
	},

	// post.save(function(err) {
	//   if (err) { throw err; }
	// 	res.status(201).redirect("/posts");
	// });

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

	EditPage: async function (req, res) {
		const { id } = req.params;
		const post = await Post.findById(id);
		res.render("posts/edit", {
			post,
			message: req.body.message,
			id: req.params.id,
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
		const postsSearch = req.query.search;
		await Post.find(
			{ $text: { $search: postsSearch } },
			function (err, postsSearch) {
				if (err) {
					throw err;
				}
				res.render("posts/search", { postsSearch: postsSearch });
			}
		);
	},
};

module.exports = PostsController;
