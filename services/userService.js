const User = require("../models/user");

exports.getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  return user;
};

exports.getUserById = async (userId) => {
  const user = await User.findById(userId);
  return user;
};
