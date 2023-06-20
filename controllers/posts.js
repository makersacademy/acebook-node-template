const Post = require("../models/post");
const helpers = require("handlebars-helpers")();
const fs = require("fs");


const PostsController = {
	Index: (req, res) => {
		const usersFriends = req.session.user.friends;

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

				const reversedPosts = posts.reverse();
				const timeSince = helpers.timeSince;

				res.render("posts/index", {
					posts: reversedPosts,
					timeSince: timeSince,
				});
			}
		);
	},

	New: (req, res) => {
		res.render("posts/new", {});
	},

	Create: (req, res) => {
		const user = req.session.user;
		console.log(req.body);

		const post = new Post({
			message: req.body.message,
			postAuthor: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			},
			image: {
				data: req.file
					? fs.readFileSync("/tmp/my-uploads/" + req.file.filename, "base64")
					: null, // Read and encode the file as base64
				contentType: req.file ? req.file.mimetype : null, // Store the file mimetype in the database
			},
		});

		post.timestamp = new Date();
		post.image.data ? post.image.data.toString("base64") : null;

		post.save((err) => {
			if (err) {
				throw err;
			}
			console.log("Post saved:", post);

			res.status(201).redirect("/posts");
		});
	},

	getImage: (req, res) => {
		Post.findById(req.params.postId, (err, post) => {
			if (err || !post || !post.image.data) {
				return res.status(404).send("Image not found");
			}
			res.set("Content-Type", post.image.contentType);

			let stringData = post.image.data.toString();
			let imageData = stringData.replace(/^data:image\/png;base64,/, "");

			res.send(Buffer.from(imageData, "base64"));
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
