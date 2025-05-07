const bcrypt = require("bcryptjs");

const correctPassword = (password, hash) => {
  bcrypt.compare(password, hash, function(error, isMatch) {
    if (error) {
      throw error;
    } else if (!isMatch) {
      return false;
    } else {
      return true;
    }
  })
}

module.exports = correctPassword;