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
    friends: ["joe@joe.com", "chris@chris.com", "sue@sue.com"],
  },
  {
    firstName: "Joe",
    lastName: "Brown",
    email: "joe@joe.com",
    password: "$2b$10$X1zkDaZMR7.s9PTS/IzK5eCkBkDQxdcxJa90OrwgGiPjjQ00CK.Z6", // password1
    friends: ["alex@alex.com", "chris@chris.com", "peter@peter.com"],
  },
  {
    firstName: "Chris",
    lastName: "Robinson",
    email: "chris@chris.com",
    password: "$2b$10$Zk40SU.AGeyaQctsEjwRA.cjD6pKb7kqoWDciHFpQm0zCKn4uxrt.", // password1
    friends: ["susie@susie.com", "joe@joe.com"],
  },
  {
    firstName: "Sue",
    lastName: "Mason",
    email: "sue@sue.com",
    password: "$2b$10$STIfhgfqBgRI7ocwv5w0ZOH6RM8aLMIdPYiC/URiqqs7NG2HEs/vO", // password1
    friends: ["alex@alex.com", "chris@chris.com", "joe@joe.com"],
  },
  {
    firstName: "Susie",
    lastName: "Smith",
    email: "susie@susie.com",
    password: "$2b$10$YzSIz6AGYa8aM/38S4mPSuaFhBcIF9ziA0Vm2MA84ZUJBx5KVHpG.", // password1
    friends: [],
  },
  {
    firstName: "Peter",
    lastName: "Smith",
    email: "peter@peter.com",
    password: "$2b$10$g9/cBqkFlsE.FLc1wH6kPOf0aUnKpEZjUAaxLcIP9iCOLAc0F4OAG", // password1
    friends: [],
  },
  {
    firstName: "Test",
    lastName: "Test",
    email: "test@test.com",
    password: "$2b$10$T7gwCG2ZcVmgB8SCaLpGf.BvTjEX70yzgbh3mPT6gZ5oS3cK/GGUq", // Testtest1
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
