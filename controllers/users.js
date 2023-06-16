const User = require("../models/user");

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

const validator = (firstName, lastName, email, password) => {
	const errorMessages = [];

	if (!(firstName.length >= 1 && firstName[0].match(/[A-Z]/))) {
		errorMessages.push(
			"First name is invalid: Must contain at least one letter, and the first letter must be capitalised."
		);
	}

	if (!(lastName.length >= 1 && lastName[0].match(/[A-Z]/))) {
		errorMessages.push(
			"Last name is invalid: Must contain at least one letter, and the first letter must be capitalised."
		);
	}

	if (!email.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}/)) {
		errorMessages.push("Email is invalid.");
	}

	if (
		!(password.length >= 8 && password.match(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/))
	) {
		errorMessages.push(
			"Password is invalid: Must contain at least 8 characters, a letter and a number."
		);
	}

	return errorMessages;
};

module.exports = UsersController;
