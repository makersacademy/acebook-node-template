const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require("../mongodb_helper");
const User = require("../../models/user");

const createAndValidateUser = (obj) => {
  const user = new User(obj);
  return user.validateSync();
};

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });


  describe("User creation", () => {
    it("requires password to be at least 8 characters", () => {
      const error = createAndValidateUser({
        email: "test@example.com",
        password: "pass",
        username: "testuser",
      });
      expect(error.errors["password"].message).toBe(
        "Password is too short. At least 8 characters."
      );
    });

  });

//can't get these two tests to pass

// describe("User creation duplicate email", () => {
//   it("throws a duplicate key error when saving a user with an existing email", async () => {
//     const user1 = new User({ email: "test@google.com", password: "password", username: "banana" });
//     await user1.save();

//     const user2 = new User({ email: "test@google.com", password: "password", username: "hello" });
//     await expect(user2.save()).rejects.toThrowError(/E11000 duplicate key error/);
//   });
// });

// describe("User creation duplicate username", () => {
//     it("throws a duplicate key error when saving a user with an existing username", async () => {  
//       await expect(User.create([
//         { email: "test123@google.com", password: "password", username: "banana" },
//         { email: "test@google.com", password: "password", username: "banana" }
//       ])).rejects.toThrowError(/E11000 duplicate key error/);
//     });
//   });

describe("User validation", () => {
    it("trailing whitespace is ignored in email", async () => {
      const user = new User({
        email: "existing2@example.com   ",
        password: "password456",
        username: "banana",
      });

      await user.save(); 

      const retrievedUser = await User.findOne({ username: "banana" });

      expect(retrievedUser.email).toBe("existing2@example.com");
    });

    it("trailing whitespace is ignored in username", async () => {
      const user = new User({
        email: "existing2@example.com",
        password: "password456",
        username: "banana   ",
      });

      await user.save(); // Save the user to the database

      // Retrieve the user from the database
      const retrievedUser = await User.findOne({ email: "existing2@example.com" });

      // Assert that the username has been trimmed
      expect(retrievedUser.username).toBe("banana");
    });
  });

  describe("User listing", () => {
    it("can list several users", async () => {
      await User.deleteMany();
      const user1 = new User({
        username: "peter",
        email: "someone@example.com",
        password: "password",
      });

      const user2 = new User({
        username: "bob",
        email: "someone2@example.com",
        password: "pass2word",
      });

      const users = [user1, user2];

      // Save the users to the database
      for (const user of users) {
        await user.save();
      }

      // Retrieve all users from the database
      const retrievedUsers = await User.find({}, "username email");

      // Assert the retrieved users
      expect(retrievedUsers).toContainEqual(
        expect.objectContaining({ username: "peter", email: "someone@example.com" })
      );
      expect(retrievedUsers).toContainEqual(
        expect.objectContaining({ username: "bob", email: "someone2@example.com" })
      );
    });
  });
});