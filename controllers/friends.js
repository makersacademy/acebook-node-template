const User = require("../models/user");

const FriendsController = {
	Create: (req, res) => {
		console.log("put request made");
		const friendUsername = req.params.friendUsername;
		const currentUser = req.session.user;
		let newFriendList;

		User.findOne({ username: friendUsername }, (err, friendUser) => {
			if (err) {
				// do something if there's an error?
				console.log(err);
			} else {
				// update current user's friend list with new friend added
				newFriendList = currentUser.friends.concat(friendUser._id);
				User.updateOne(
					{ username: currentUser.username },
					{ $push: { friends: friendUser._id } },
					(err) => {
						if (err) {
							// do something if there's an error?
							console.log("error with FriendsController.Create User.updateOne");
							console.log(err);
						} else {
							// update user object in session with friends list
							req.session.user.friends = newFriendList;
							console.log(
								`${friendUsername} added to ${currentUser.username} friends list`
							);
							res.send(JSON.stringify({ newFriendAdded: true }));
						}
					}
				);
			}
		});
	},
};

module.exports = FriendsController;
