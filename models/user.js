const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	friends: {
		type: [String],
		default: [],
	},
	friendRequests: {
        type: [String],
        default: [],
    },
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



