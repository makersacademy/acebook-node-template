const User = require("../models/user");
const fs = require("fs");

const ProfileController = {
	Index: (req, res) => {
		const currentUser = req.session.user;
		User.find({}, async (err, allUsers) => {
			if (err) {
				throw err;
			}
			// create a list of users who are friends
			const friends = currentUser.friends;
			const friends_names = allUsers.filter((user) =>
				friends.includes(user.email)
			);
			// create a list of users who are not friends
			let nonFriends = allUsers.filter(
				(user) =>
					!friends.includes(user.email) && user.email !== currentUser.email
			);

			// create a list of users who have sent a friend request to current user
			const friendRequests = await allUsers.filter((user) =>
				currentUser.friendRequests.includes(user.email)
			);

			// Check if friendRequestSent exists in currentUser.sentFriendRequests
			const friendRequestSent = allUsers.filter((user) =>
				currentUser.sentFriendRequests.includes(user.email)
			);

			nonFriends = nonFriends.map((user) => {
				return {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					friendRequested: currentUser.sentFriendRequests.includes(user.email),
				};
			});
			res.render("profile/index", {
				friends_names: friends_names,
				nonFriends: nonFriends,
				friendRequests: friendRequests,
				friendRequestSent: friendRequestSent,
				currentUser: currentUser,
			});
		});
	},

	RemoveFriend: (req, res) => {
		const currentUser = req.session.user;
		const friendEmail = req.body.friendEmail;

		// Remove the friend from the current user's friends list
		User.findOneAndUpdate(
			{ email: currentUser.email },
			{ $pull: { friends: friendEmail } },
			{ new: true },
			(err, updatedUser) => {
				if (err) {
					throw err;
				}

				// Remove the current user from the friend's friends list
				User.findOneAndUpdate(
					{ email: friendEmail },
					{ $pull: { friends: currentUser.email } },
					{ new: true },
					(err) => {
						if (err) {
							throw err;
						}

						// Re-query the user data with updated friends list
						User.find({}, (err) => {
							if (err) {
								throw err;
							}

							// Update the friend lists in the session
							currentUser.friends = updatedUser.friends;

							// Redirect to the Index route to render the updated data
							res.redirect("/profile");
						});
					}
				);
			}
		);
	},

	// AddFriend function in ProfileController
	AddFriend: (req, res) => {
		const currentUserEmail = req.session.user.email;
		const friendEmail = req.body.friendEmail;
		User.findOne({ email: currentUserEmail }, (err, currentUser) => {
			if (err) {
				throw err;
			}
			User.findOne({ email: friendEmail }, (err, friendUser) => {
				if (err) {
					throw err;
				}
				if (!friendUser) {
					res.json({ message: "User not found" });
				} else if (friendUser.friendRequests.includes(currentUser.email)) {
					res.json({ message: "Friend request already sent" });
				} else if (currentUser.sentFriendRequests.includes(friendEmail)) {
					res.json({ message: "Friend request already sent" });
				} else {
					friendUser.friendRequests.push(currentUser.email);
					friendUser.save((err) => {
						if (err) {
							throw err;
						}
						currentUser.sentFriendRequests.push(friendEmail);
						currentUser.save((err) => {
							if (err) {
								throw err;
							}
							req.session.user = currentUser;
							req.session.friendRequestSent = friendEmail; // Update the session
							res.json({ message: "Friend request sent" });
						});
					});
				}
			});
		});
	},

	AcceptFriendRequest: (req, res) => {
		const currentUser = req.session.user;
		const friendEmail = req.body.friendEmail;
		User.findOneAndUpdate(
			{ email: currentUser.email },
			{
				$pull: { friendRequests: friendEmail },
				$push: { friends: friendEmail },
			},
			{ new: true }
		)
			.then((user) => {
				// Update the session with the updated user information
				req.session.user = user;
				// Remove friendRequestSent value from session
				req.session.friendRequestSent = null;
				// Update the friend user's friends list
				return User.findOneAndUpdate(
					{ email: friendEmail },
					{ $push: { friends: currentUser.email } },
					{ new: true }
				);
			})
			.then((updatedFriendUser) => {
				console.log("Updated Friend User:", updatedFriendUser);
				// Send a response to the client-side indicating success
				res.json({ success: true });
			})
			.catch((err) => {
				throw err;
			});
	},

	AddProfilePicture: (req, res) => {
		const currentUserEmail = req.session.user.email;

		User.findOne({ email: currentUserEmail }).then((user) => {
			// console.log(user, "<<<<<< THIS IS A USER # 1");
			user.profileImage = {
				data: req.file
					? fs.readFileSync(
							"public/images/profileUploads/" + req.file.filename,
							"base64"
					  )
					: null, // Read and encode the file as base64
				contentType: req.file ? req.file.mimetype : null, // Store the file mimetype in the database
			};
			user.save((err, updatedUser) => {
				if (err) {
					throw err;
				}
				console.log("Profile photo saved:", updatedUser);
				req.session.user = updatedUser;

				res.status(201).redirect("/profile");
			});
		});
	},

	getImage: (req, res) => {
		console.log(req.session.user, "<<<<< THIS IS THE LOGGED IN USER");

		// res.set("Content-Type", currentUser.profileImage.contentType);

		// let stringData = currentUser.profileImage.data.toString();
		// let imageData = stringData.replace(/^data:image\/png;base64,/, "");

		// res.send(Buffer.from(imageData, "base64"));

		User.findById(req.session.user._id, (err, user) => {
			if (err || !user || !user.profileImage.data) {
				return res.status(404).send("Image not found");
			}
			res.set("Content-Type", user.profileImage.contentType);
			console.log(user.profileImage.contentType);

			// console.log(user.profileImage.data, "<<<<<< THIS IS THE ORIGINAL DATA");

			let stringData = user.profileImage.data.toString();
			// console.log(stringData, "<<<< THIS IS STRING DATA");
			// let imageData = stringData.replace(/^data:image\/jpeg;base64,/, "");
			// console.log(imageData)

			res.send(Buffer.from(stringData, "base64"));
		});
	},

	getFriendImage: (req, res) => {
		User.findById(req.session.user._id, (err, user) => {
			if (err || !user || !user.profileImage.data) {
				return res.status(404).send("Image not found");
			}
			res.set("Content-Type", user.profileImage.contentType);
			console.log(user.profileImage.contentType);

			// console.log(user.profileImage.data, "<<<<<< THIS IS THE ORIGINAL DATA");

			let stringData = user.profileImage.data.toString();
			// console.log(stringData, "<<<< THIS IS STRING DATA");
			// let imageData = stringData.replace(/^data:image\/jpeg;base64,/, "");
			// console.log(imageData)

			res.send(Buffer.from(stringData, "base64"));
		});
	},
};

module.exports = ProfileController;
