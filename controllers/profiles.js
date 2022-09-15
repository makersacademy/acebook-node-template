const User = require("../models/user");

const ProfilePage = {
	LoadFromProfileButton: (req, res) => {
		res.redirect(`/profiles/${req.session.user.username}`);
	},

	Index: (req, res) => {
		let profileUsername = req.params.username;

		if (!profileUsername) {
			profileUsername = req.body.searchBar;
		}
		// find user model belonging to profile
		User.findOne({ username: profileUsername })
			.populate("friends")
			.exec((err, user) => {
				if (err) {
					// do something if there's an error
					console.log("ProfilePage.index error with User.findOne");
					console.log(err);
				} else {
					if (!user) {
						console.log(`Unable to find ${profileUsername}'s profile`);
						res.render("profiles/userNotFound");
					} else {
						console.log(`${profileUsername}'s profile has been loaded`);
						const ownProfile = req.session.user.username === profileUsername;
						console.log(req.session.user.friends);
						const isAFriend = req.session.user.friends.includes(
							user._id.toString()
						);

						const friendsListWithUsernames = user.friends.map(
							(friend) => friend.username
						);
						res.render("profiles/index", {
							profileUsername: profileUsername,
							profileFirstname: user.first_name,
							profileLastname: user.last_name,
							friends: friendsListWithUsernames,
							fetchUrl: "/friends/requests/new/" + profileUsername,
							displayAddFriendButton: !ownProfile && !isAFriend,
							isAFriend: isAFriend,
						});
					}
				}
			});
	},
};

module.exports = ProfilePage;
