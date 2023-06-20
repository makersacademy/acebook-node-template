const User = require("../models/user");

exports.getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

exports.usernameExists = async (username) => {
  const user = await User.findOne({ username: username });
  return user ? true : false;
};

exports.emailExists = async (email) => {
  const user = await User.findOne({ email: email });
  return user ? true : false;
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};
