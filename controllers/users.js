const User = require("../models/user");

const UsersController = {
	New: (req, res) => {
		res.render("users/new", {});
	},

	Create: (req, res) => {
		console.log("Attempting to sign up new user");
		const user = new User(req.body);
		user.save((err) => {
			if (err) {
				// err is thrown if username or email match existing user entries
				console.log(err.keyPattern);
				res.send(
					JSON.stringify({
						credentialsExist: true,
					})
				);
			} else {
				res.send(JSON.stringify({ ok: true }));
			}
		});
	},
};

module.exports = UsersController;
