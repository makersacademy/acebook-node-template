const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      validate: [
        {
          validator: function lengthValidator(message) {
            return message.length < 500;
          },
          message: "Post message cannot be longer than 500 characters",
        },
        {
          validator: function contentValidator(message) {
            const lowerCaseMessage = message.toLowerCase();
            return !lowerCaseMessage.includes("facebook");
          },
          message: "Post message cannot contain the word 'facebook'",
        },
        {
          validator: function emptyValidator(message) {
            return message.trim().length > 0;
          },
          message: "Post message cannot be empty",
        },
      ],
      required: [true, "Post message is required"],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
