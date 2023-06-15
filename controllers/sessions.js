const User = require("../models/user");
const bcrypt = require("bcrypt");

const SessionsController = {
	New: (req, res) => {
		res.render("sessions/new", { title: "Acebook" });
	},

	Create: (req, res) => {
		console.log("trying to log in");
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({ email: email }).then((user) => {
			if (!user) {
				const errorMessage = "Invalid user/password.";
				res.status(404);
				res.render("sessions/new", { errorMessage: errorMessage });
			} else {
				bcrypt.compare(password, user.password, function (error, isMatch) {
					if (error) {
						throw error;
					} else if (!isMatch) {
						const errorMessage = "Invalid user/password.";
						res.status(404);
						res.render("sessions/new", { errorMessage: errorMessage });
					} else {
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
