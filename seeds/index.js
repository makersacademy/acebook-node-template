const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");
const Friend = require("../models/friend");
const users = require("./data/users");
const cloudinary = require('cloudinary').v2;

mongoose.connect("mongodb://0.0.0.0/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB");
});

const seedDB = async () => {
  try {
    console.log("Clearing friend data...");
    await Friend.deleteMany({});
    console.log("Friend data cleared.");

    console.log("Clearing like data...");
    await Like.deleteMany({});
    console.log("Like data cleared.");

    console.log("Clearing post data...");
    await Post.deleteMany({});
    console.log("Post data cleared.");

    console.log("Clearing user data...");
    await User.deleteMany({});
    console.log("User data cleared.");

    let createdUsers = [];
    for (let userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`User ${user.email} created successfully.`);
      createdUsers.push(user);

      const post = new Post({
        message: "Hello, World!",
        user: user._id,
      });
      await post.save();
      console.log(`Post "${post.message}" created successfully.`);

      const like = new Like({
        liked: true,
        post: post._id,
        user: user._id,
      });
      await like.save();
      console.log(
        `Like post_id "${like.post}", Like user_id "${like.user}" created successfully.`
      );
    }
    const accepted_friendship = new Friend({
      requester: createdUsers[1],
      recipient: createdUsers[0],
      friendship: true,
    });
    await accepted_friendship.save();
    console.log(
      `Accepted friendship between "${accepted_friendship.requester.username}" and "${accepted_friendship.recipient.username}" created successfully.`
    );

    const pending_friendship = new Friend({
      requester: createdUsers[2],
      recipient: createdUsers[0],
      friendship: null,
    });
    await pending_friendship.save();
    console.log(
      `Pending friendship between "${pending_friendship.requester.username}" and "${pending_friendship.recipient.username}" created successfully.`
    );
  } catch (err) {
    console.log(err);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("Database seeding completed. Connection closed.");
});

//cloudinary stuff
// Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true
// });
// console.log(cloudinary.config());

// const uploadImage = async (imagePath) => {

//   // Use the uploaded file's name as the asset's public ID and 
//   // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const getAssetInfo = async (publicId) => {

//   // Return colors in the response
//   const options = {
//     colors: true,
//   };

//   try {
//       // Get details about the asset
//       const result = await cloudinary.api.resource(publicId, options);
//       console.log(result);
//       return result.colors;
//       } catch (error) {
//       console.error(error);
//   }
// };