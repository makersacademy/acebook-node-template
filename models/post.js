const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    validate: [
      {
        validator: function (message) {
          return message.length < 500;
        },
        message: "Post message cannot be longer than 500 characters",
      },
      {
        validator: function (message) {
          const lowerCaseMessage = message.toLowerCase();
          return !lowerCaseMessage.includes("facebook");
        },
        message: "Post message cannot contain the word 'facebook'",
      },
    ],
    required: [true, "Post message is required"],
  },
  likes: { type: Number, default: 0 },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
