const User = require("../models/user");
const validator = require("../src/validator");

const UsersController = {
	New: (req, res) => {
		res.render("users/new", {});
	},

	Create: async (req, res) => {
		try {
			const user = new User(req.body);
			const errorMessages = validator(
				user.firstName,
				user.lastName,
				user.email,
				user.password
			);

			if (errorMessages.length > 0) {
				res.status(400);
				res.render("users/new", { errorMessages: errorMessages });
			} else {
				await user.save();
				res.status(201).redirect("/sessions/new");
			}
		} catch (err) {
			const errorMessages = [];

			const errKeys = Object.keys(err.errors);
			errKeys.forEach((key) => {
				errorMessages.push(err.errors[key].message);
			});

			res.status(400);
			res.render("users/new", { errorMessages: errorMessages });
		}
	},
};

module.exports = UsersController;
