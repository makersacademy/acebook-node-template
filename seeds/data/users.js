const bcrypt = require('bcrypt');

// Define the salt rounds. The higher the number, the more secure but also more CPU-intensive the hashing.
const saltRounds = 10;

module.exports = [
  {
    email: "test@test.com",
    password: bcrypt.hashSync("test123!", saltRounds),
    username: "bob"
  },
];

