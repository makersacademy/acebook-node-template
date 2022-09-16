const Post = require("../models/post");
const Comment = require("../models/comment");

const LikesController = {
	UpdatePost: (req, res) => {
		const userId = req.session.user._id;
		const postId = req.params.postId;

		console.log("this post is being liked");
		console.log(postId);

		Post.findOne({ _id: postId, likes: userId }, (err, post) => {
			// checks to see if the user has liked the post
			if (err) {
				// do something if error
				console.log(err);
			} else {
				// if user hasn't liked the post, add the userID to the likes array in the post entry
				// if they have, remove the userId from the likes array
				const updateObject = {};
				const updateOperator = !post ? "$addToSet" : "$pull";
				updateObject[updateOperator] = { likes: userId };
				Post.findOneAndUpdate(
					{ _id: postId },
					updateObject,
					{ new: true },
					(err, post) => {
						if (err) {
							console.log(err);
						} else {
							console.log(`${userId} ${updateOperator} ${postId} likes`);
							res.send(JSON.stringify({ counter: post.likes.length }));
						}
					}
				);
			}
		});
	},

	UpdateComment: (req, res) => {
		const userId = req.session.user._id;
		const commentId = req.params.commentId;

		console.log("this comment is being liked");
		console.log(commentId);

		Comment.findOne({ _id: commentId, likes: userId }, (err, comment) => {
			// checks to see if the user has liked the comment
			if (err) {
				// do something if error
				console.log(err);
			} else {
				// if user hasn't liked the comment, add the userID to the likes array in the comment entry
				// if they have, remove the userId from the likes array
				const updateObject = {};
				const updateOperator = !comment ? "$addToSet" : "$pull";
				updateObject[updateOperator] = { likes: userId };
				Comment.findOneAndUpdate(
					{ _id: commentId },
					updateObject,
					{ new: true },
					(err, comment) => {
						if (err) {
							console.log(err);
						} else {
							console.log(`${userId} ${updateOperator} ${commentId} likes`);
							res.send(JSON.stringify({ counter: comment.likes.length }));
						}
					}
				);
			}
		});
	},
};

module.exports = LikesController;
