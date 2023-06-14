const User = require("../models/user");
const bcrypt = require("bcrypt");

const SessionsController = {
	New: (req, res) => {
		res.render("sessions/new", {});
	},

	Create: (req, res) => {
		console.log("trying to log in");
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({ email: email }).then((user) => {
			if (!user) {
				console.log("User doesn't exist!");
				res.redirect("/sessions/new");
			} else {
				bcrypt.compare(password, user.password, function (error, isMatch) {
					if (error) {
						throw error;
					} else if (!isMatch) {
						console.log("Password doesn't match!");
						res.redirect("/sessions/new");
					} else {
						console.log("Password matches!");
						req.session.user = user;
						res.redirect("/posts");
					}
				});
			}
		});
	},

	Destroy: (req, res) => {
		console.log("logging out");
		if (req.session.user && req.cookies.user_sid) {
			res.clearCookie("user_sid");
		}
		res.redirect("/sessions/new");
	},
};

module.exports = SessionsController;
