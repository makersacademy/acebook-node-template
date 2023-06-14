const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
});

UserSchema.pre("save", function (next) {
	const user = this;

	if (this.isModified("password") || this.isNew) {
		bcrypt
			.genSalt(saltRounds)
			.then((salt) => {
				console.log("Salt: ", salt);
				return bcrypt.hash(user.password, salt);
			})
			.then((hash) => {
				console.log("Hash: ", hash);
				user.password = hash;
				next();
			})
			.catch((err) => console.error(err.message));
	} else {
		return next();
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
