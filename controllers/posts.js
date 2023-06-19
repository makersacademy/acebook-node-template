const Post = require("../models/post");
const User = require("../models/user");
const helpers = require("handlebars-helpers")();

const PostsController = {
	Index: (req, res) => {
		const postId = req.params.postId;
		const userId = req.session.user._id;
		const usersFriends = req.session.user.friends;
		// usersFriends.push(req.session.user.email);
		// console.log(usersFriends, "<<<<<< USERS FRIENDS");

		Post.find(
			{
				$or: [
					{ "postAuthor.email": { $in: usersFriends } },
					{ "postAuthor.email": req.session.user.email },
				],
			},
			(err, posts) => {
				if (err) {
					throw err;
				}
				console.log(posts, "<<<<<< POSTS");

				const reversedPosts = posts.reverse();
				const timeSince = helpers.timeSince;

				res.render("posts/index", {
					posts: reversedPosts,
					timeSince: timeSince,
				});
			}
		);

		// User.find({ email: { $in: usersFriends } }, (err, users) => {
		// 	if (err) {
		// 		throw err;
		// 	}

		// 	const userIds = users.map((user) => user._id.toString());
		// 	console.log(userIds, "<<<<<<< USERS IDS");

		// 	Post.find({ "postAuthor.id": { $in: userIds } }, (err, posts) => {
		// 		if (err) {
		// 			throw err;
		// 		}
		// 		console.log(posts, "<<<<<< POSTS");

		// 		const reversedPosts = posts.reverse();
		// 		const timeSince = helpers.timeSince;

		// 		res.render("posts/index", {
		// 			posts: reversedPosts,
		// 			timeSince: timeSince,
		// 		});
		// 	});
		// });

		// .then((users) => {
		// 	console.log(users, "<<<<<< USERS FRIENDS IDS");
		// Post.find({ postAuthor: { id: { $in: users } } }).then((posts) =>
		// 	console.log(posts, "<<<<<<< POSTS")
		// );

		// 	Post.find((posts) => {
		// 		console.log(posts);
		// 		const filteredPosts = posts.filter((post) =>
		// 			users.includes(post.postAuthor.id)
		// 		);
		// 		console.log(filteredPosts);
		// 	});
		// });

		// Post.find({ postAuthor: { id: { $in: usersIds } } }).then((posts) =>
		// 	console.log(posts)
		// );

		// Reverse the order of posts array
		// 	const reversedPosts = posts.reverse();
		// 	const timeSince = helpers.timeSince;

		// 	res.render("posts/index", { posts: reversedPosts, timeSince: timeSince });
		// };
	},

	New: (req, res) => {
		res.render("posts/new", {});
	},

	Create: (req, res) => {
		const post = new Post(req.body);
		const user = req.session.user;

		post.postAuthor = {
			firstName: user.firstName,
			lastName: user.lastName,
			// id: user._id,
			email: user.email,
		};

		post.timestamp = new Date();

		post.save((err) => {
			if (err) {
				throw err;
			}
			res.status(201).redirect("/posts");
		});
	},

	Show: (req, res) => {
		Post.findById(req.params.postId)
			.populate("comments")
			.then((post) => res.render("posts/show", { post }))
			.catch((err) => {
				console.log(err.message);
			});
	},

	likePost: (req, res) => {
		const postId = req.params.postId;
		const userId = req.session.user._id;

		// Find the post by ID in the database
		Post.findById(postId)
			.updateOne({ _id: postId }, { $addToSet: { likes: userId } })
			.then(() => {
				return Post.findById(postId);
			})
			.then((updatedPost) => {
				const likesCount =
					updatedPost.likes && Array.isArray(updatedPost.likes)
						? updatedPost.likes.length
						: 0;

				res.json({ likesCount });
			});
	},
};

module.exports = PostsController;
