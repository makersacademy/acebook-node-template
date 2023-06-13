const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");

mongoose.connect("mongodb://0.0.0.0/acebook_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB");
});

const seedDB = async () => {
  try {
    console.log("Clearing post data...");
    await Post.deleteMany({});
    console.log("Post data cleared.");
    console.log("Clearing user data...");
    await User.deleteMany({});
    console.log("User data cleared.");
  } catch (err) {
    console.log(err);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Database seeding completed. Connection closed.");
});
