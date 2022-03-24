const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  image: {
    type: Object,
    default: "https://images.unsplash.com/photo-1583867195148-e869329c07b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGlub3NhdXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;