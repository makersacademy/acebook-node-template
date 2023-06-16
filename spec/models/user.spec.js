const mongoose = require("mongoose");
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

  afterAll(() => {
    mongoose.connection.close();
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

    it("throws a duplicate key error when saving a user with an existing email", async () => {
      const user1 = new User({
        email: "test@google.com",
        password: "password",
        username: "banana",
      });

      await user1.save();

      const user2 = new User({
        email: "test@google.com",
        password: "password",
        username: "hello",
      });

      await expect(user2.save()).rejects.toThrow("Email already in use.");
    });

    it("throws a duplicate key error when saving a user with an existing username", async () => {
      const user1 = new User({
        email: "test123@google.com",
        password: "password",
        username: "banana",
      });

      await user1.save();

      const user2 = new User({
        email: "test@google.com",
        password: "password",
        username: "banana",
      });

      await expect(user2.save()).rejects.toThrow("Username already in use.");
    });
  });

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

      await user.save();

      const retrievedUser = await User.findOne({
        email: "existing2@example.com",
      });

      expect(retrievedUser.username).toBe("banana");
    });
  });

  describe("User listing", () => {
    it("can list several users", async () => {
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

      for (const user of users) {
        await user.save();
      }

      const retrievedUsers = await User.find({}, "username email");

      expect(retrievedUsers).toContainEqual(
        expect.objectContaining({
          username: "peter",
          email: "someone@example.com",
        })
      );
      expect(retrievedUsers).toContainEqual(
        expect.objectContaining({
          username: "bob",
          email: "someone2@example.com",
        })
      );
    });
  });
});
