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
	sentFriendRequests: {
		type: [String],
		default: [],
	},
	profileImage: {
		data: Buffer,
		contentType: String,
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

// Seed data
User.collection.drop();

const usersData = [
	{
		firstName: "Alex",
		lastName: "Buzea",
		email: "alex@alex.com",
		password: "$2b$10$1xNFZD.MzQ50PA79QMs/TOhCQAa1wnih/IufG0AQ0lRKxfKg.ed7W", // password1
		friends: ["joe@joe.com"],
		profileImage: {
			contentType: "image/jpeg",
			data: Buffer.from(
				"aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQU9RQUFBQjRCQU1BQUFBUTNVT0dBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQ0JqU0ZKTkFBQjZKZ0FBZ0lRQUFQb0FBQUNBNkFBQWRUQUFBT3BnQUFBNm1BQUFGM0NjdWxFOEFBQUFNRkJNVkVYLy8vLzQvUHp2OS9majhmSFg2K3VsMDlPQXdNRlVxNnhBb2FKSHBhWmlzck9SeWNuSDQrUnl1Ym8vb2FLNDNOeEFkMUlXQUFBQUFXSkxSMFFBaUFVZFNBQUFBQWQwU1UxRkIrVUZIUTh5SnRUdnRoSUFBQVNFU1VSQlZHamU3ZHBQaUJ0VkdBRHdsOG5zZHJmSmt0aURhQkYyUk1IdG4wTktFWExyK3VkUXBkQ3BTRGNIbFI1MGpYcG9wQlJ6V2R6VzNlYk54cmgvRHBJVndVV0Vwa29sWHVxQ2xWMTdra1UwcUdodTNtVHBLVlNsc1hndzh5YVRlZCtiVEtqMis5NHAzMkhKTi9PWVg3NlpOMi9lbXl4and4akdNSWJ4ZjJQZjBhZVBIdEVKUHY0cWQrT0Q2N3JBUTc5eVoyNTI5dlVydTN6cHJBN1EyTm1kNjFabnZsams1V2w2Y3RNNUpXVXozTm1tcmpHdmxIWHM4NlVXTGRrK3IyNHhhemN6bE9JenkrRnRzVnFaVUV5VTAzMjJtczF6WktKeE9kTjMrMGkxUlVWTzJSRTdEbEtkV3ZPVHlGMjVNelRrVHZTdVpJVkVUTllIN0R6UW9DQlBETm9adjBRZ0d0TURkMmR0aWpJSGhybDg3OGY0cjlGT2F5ZEhDd1FITmEyQnV6OUNCNDB2dVZNZjFDQnIzZDJCN2o3YW5jbE9LVDJnd1dnRFdad1FFNnpDb0NacnlHUmVrS0xNK0YremI3elFwOTQ3dUdLQ2UxSHZYTlNtKzZIeVJLak5lQWFWekhiSmR6dVBNTzlUcWFXMlNUWXd4Vml4UzVZWXEzVS9WaXkxRmVyRlRISS9iS1BLZzRwaGZJVkpqdmZJdFlCMEx5eUkvWmprOXoxbU1SYVE2Z05ySW8xSTFub01UeGQ1VkpsSkc1RU1LdU4yamtlVmFSVHd4S0QzZEFhZ01SNVo1c2Q0NUtpa0xDU2tSSGt1LzRsSGprdktrbHd5bndidEhzSWpINUFReDVMSlZkQnVFby9NeXNyMnBwVEErZXNJRWRtQVgwQnVsOElqajh2SXhRZmw3SUxjTGtsRUx1L2xrV2VXaUx3MEltZEtuNlVoU3pGQXJtZ2d1VldVczBVZHBKMEhxUTZ5a0FQcEdSSVMzSWw4OVZ1WWtwQlR3RmlES2NYS2tyRXhZQ3k0YVNuVEcvY3lGT1FlUUM3dUZSMjE5ejFzQ2pJQnlJcWJsb01MUEU5Qm1vQjBVdTdmcmQ3ZFNmUFNCNUFjZmdOM09rMFFZTHpoajBBU1BzQ3dBbzQzVHlya1NyZFZESk9FTi8rTktpUVh1cTFNVEJMZW1MY1UwdTgvQ1V3UzNpWFBLYVEvc3IrTVNjSStla3NSdTRPQnNZSkp3aTc3aDBwdWlEWjdiRlR5dUN6OG81TGVuQ3Rub1pKZ2luVklKY1hNd0VTZWVTVjNBOEFaVjBsSG5OY0w5NG9vMFpScXlxcWttT2JWNnNpa3hLeHVoa2piWFowaGl5elZPL3pOeVpEb3Z2WEs0NytROWM3czZVK3ZUdWZDNUVabnNDaWdrMTZmZWYvNWsxZkNJcmRZMDBtamszRWVIV3RzZi9ndEVFS0EwY0NwU2tuSk1tbG1RQ2tKK2VtK2ZlMGdxN05Ob2hWWWdIeDI3WmZyN0c4Lys1bmQ5b2RaN0REbGs4ay9aRE1pTC8zSW51VjhpVVJrN0FEb00rZGloNzkrYTI3cllUYlRTZDRrSW8wbU1IK3ozSTBuM1kyL3g0bElCdGZQdkxUMXcrbWExNEVPVXBIc3NmNzM1VUs4YXBHWnQvdUpGYXROTTVmMTRyV3c2TFR1NSsvWmRHVHNwUkI1S2xXbFdrdDN6Um1seGk5U05VNDFGUGl4QThiWDFxUklDNlFrZXpTLzY0dHZIK21NcjI2czBKS01IYnQyZVgxOS9lb3IzekQvUmNJOE5TbkhoSDdTRU9RN09rbHY4YUNYYk9vbmMzcEo0N3NiM2hMN29qYXlNd2ZibnRMYVk5Mmw3dnlZbHFIQUQzY051Q3hldDIzb0l0MXpXaFpqUVVNWDZjNHpIVUhhdWtoeGY0amZUVEk2cXhSQk5ZOE54NWhQVWl5QytrZnZoODJDTnRML2xZWmdjUmtaV2E3OTBXV0kyWHBGWTVHTUpZdjkvbldEdU00VFQra0ZoekdNWVJERXZ3UmoyOFg0Z2RGZ0FBQUFKWFJGV0hSa1lYUmxPbU55WldGMFpRQXlNREl4TFRBeExUQXpWREUzT2pFeU9qUXdLekF3T2pBd1JOUFFzUUFBQUNWMFJWaDBaR0YwWlRwdGIyUnBabmtBTWpBeE5TMHdOQzB3TTFRd056b3dNem8wTUNzd01Eb3dNSklER2dJQUFBQUFTVVZPUks1Q1lJST0="
			),
		},
	},
	{
		firstName: "Joe",
		lastName: "Brown",
		email: "joe@joe.com",
		password: "$2b$10$X1zkDaZMR7.s9PTS/IzK5eCkBkDQxdcxJa90OrwgGiPjjQ00CK.Z6", // password1
		friends: ["alex@alex.com"],
	},
];

// 	{
// 		firstName: "Chris",
// 		lastName: "Robinson",
// 		email: "chris@chris.com",
// 		password: "$2b$10$Zk40SU.AGeyaQctsEjwRA.cjD6pKb7kqoWDciHFpQm0zCKn4uxrt.", // password1
// 		friends: ["joe@joe.com", "alex@alex.com", "sue@sue.com"],
// 	},
// 	{
// 		firstName: "Sue",
// 		lastName: "Mason",
// 		email: "sue@sue.com",
// 		password: "$2b$10$STIfhgfqBgRI7ocwv5w0ZOH6RM8aLMIdPYiC/URiqqs7NG2HEs/vO", // password1
// 		friends: ["alex@alex.com", "chris@chris.com", "joe@joe.com"],
// 	},
// 	{
// 		firstName: "Susie",
// 		lastName: "Smith",
// 		email: "susie@susie.com",
// 		password: "$2b$10$YzSIz6AGYa8aM/38S4mPSuaFhBcIF9ziA0Vm2MA84ZUJBx5KVHpG.", // password1
// 		friends: [],
// 	},
// 	{
// 		firstName: "Peter",
// 		lastName: "Smith",
// 		email: "peter@peter.com",
// 		password: "$2b$10$g9/cBqkFlsE.FLc1wH6kPOf0aUnKpEZjUAaxLcIP9iCOLAc0F4OAG", // password1
// 		friends: ["joe@joe.com"],
// 	},
// 	{
// 		firstName: "Test",
// 		lastName: "Test",
// 		email: "test@test.com",
// 		password: "$2b$10$T7gwCG2ZcVmgB8SCaLpGf.BvTjEX70yzgbh3mPT6gZ5oS3cK/GGUq", // Testtest1
// 		friends: [],
// 	},
// ];

User.insertMany(usersData, (error) => {
	if (error) {
		console.log(error);
	} else {
		console.log("Users added successfully!");
	}
});

module.exports = User;
