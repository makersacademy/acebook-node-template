const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Like = require("../models/like");
const Comment = require("../models/comment");
const Friend = require("../models/friend");
const users = require("./data/users");
const postsData = require("./data/posts");
const comments = require("./data/comments");

mongoose.connect("mongodb://0.0.0.0/acebook", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to DB");
});

const seedDB = async () => {
  try {
    try {
      console.log("Clearing friend data...");
      await Friend.deleteMany({});
      console.log("Friend data cleared.");
    } catch (err) {
      console.error("Error clearing friend data:", err);
    }

    try {
      console.log("Clearing like data...");
      await Like.deleteMany({});
      console.log("Like data cleared.");
    } catch (err) {
      console.error("Error clearing like data:", err);
    }

    try {
      console.log("Clearing comment data...");
      await Comment.deleteMany({});
      console.log("Comment data cleared.");
    } catch (err) {
      console.error("Error clearing comment data:", err);
    }

    try {
      console.log("Clearing post data...");
      await Post.deleteMany({});
      console.log("Post data cleared.");
    } catch (err) {
      console.error("Error clearing post data:", err);
    }

    try {
      console.log("Clearing user data...");
      await User.deleteMany({});
      console.log("User data cleared.");
    } catch (err) {
      console.error("Error clearing user data:", err);
    }

    let createdUsers = [];
    for (let userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`User ${user.email} created successfully.`);
      createdUsers.push(user);
    }
    for (let postData of postsData) {
      const user = createdUsers.find((u) => u.username === postData.user);

      const post = new Post({
        message: postData.message,
        user: user._id,
        createdAt: Date.now(),
      });

      if (postData.image) {
        post.image = postData.image;
      }
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
      const randomCommentIndex = Math.floor(Math.random() * comments.length);
      const commentData = comments[randomCommentIndex + 1];

      const comment = new Comment({
        post: post._id,
        user: commentData.user,
        content: commentData.content,
      });

      await comment.save();
      console.log(`Comment "${comment.content}" created successfully.`);
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
