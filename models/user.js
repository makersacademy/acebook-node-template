const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"],
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	friends: {
		type: [String],
		default: [],
	},
	friendRequests: {
		type: [String],
		default: [],
	},
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

User.collection.drop();

//fake Users

const usersData = [
	{
		firstName: "Alex",
		lastName: "Buzea",
		email: "alex@alex.com",
		password: "123",
		friends: ["joe@joe.com", "chris@chris.com", "sue@sue.com"],
	},
	{
		firstName: "Joe",
		lastName: "Brown",
		email: "joe@joe.com",
		password: "123",
		friends: ["alex@alex.com", "chris@chris.com", "peter@peter.com"],
	},
	{
		firstName: "Chris",
		lastName: "Robinson",
		email: "chris@chris.com",
		password: "123",
		friends: ["susie@susie.com", "joe@joe.com"],
	},
	{
		firstName: "Sue",
		lastName: "Mason",
		email: "sue@sue.com",
		password: "123",
		friends: ["alex@alex.com", "chris@chris.com", "joe@joe.com"],
	},
	{
		firstName: "Susie",
		lastName: "Smith",
		email: "susie@susie.com",
		password: "123",
		friends: [],
	},
	{
		firstName: "Peter",
		lastName: "Smith",
		email: "peter@peter.com",
		password: "123",
		friends: [],
	},
];

User.insertMany(usersData, (error, users) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Users added successfully!");
	}
});

module.exports = User;
