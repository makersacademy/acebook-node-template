const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const Post = require("../../models/post");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      username:"example",
      password: "password",
    });
    expect(user.username).toEqual("example");
  });
  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      username:"user",
      password: "Password123!",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          username:"user",
          password: "Password123!",
        });
        done();
      });
    });
  });
  it ("throws an error if password is not longer than 7 or more characters", async () => {
    try {
      await new User({
        email: "someone@example.com",
        username:"user",
        password: "P23!",
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password should be longer than 7 characters or more")
    }
  })

  it ("throws an error if password does not contain special character", async () => {
    try {
      await new User({
        email: "someone@example.com",
        username:"user",
        password: "Password123",
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password must contain at least one special character: !@£$%&*")
    }
  })

  it ("throw an error if password does not contain an uppercase character", async () => {
    try {
      await new User({
        email: "someone@example.com",
        username:"user",
        password: "password123",
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password must contain at least one uppercase letter: A-Z")
    }
  })
  it("should throw an error if the password value is empty", async () => {
    try {
      await new User({
        email: "someone@example.com",
        username:"user",
        password: ""
      }).save()
    } catch (err) {
      expect(err.errors.password.message).toEqual("Password is required")
    }
  })
  it("should throw an error if the username value is empty", async () => {
    try {
      await new User({
        email: "someone@example.com",
        password: "Password123!"
      }).save()
    } catch (err) {
      expect(err.errors.username.message).toEqual("Please enter a username")
    }
  })
  it("should throw an error if the password value is empty", async () => {
    try {
      await new User({
        username:"user",
        password: "Password123!"
      }).save()
    } catch (err) {
      expect(err.errors.email.message).toEqual("Please enter an email")
    }
  })
  it("should throw an error if the email is already in use", async () => {
    try {
      await new User({
        username:"user",
        email:"test123@test.com",
        password: "Password123!"
      }).save()
      await new User({
        username:"user",
        email:"test123@test.com",
        password: "Password123!"
      }).save()
    } catch (err) {
      expect(err.errors.email.message).toEqual("Email already exists")
    }
  })
  it("should throw an error if the email is already in use", async () => {
    try {
      const user = await new User({
        username:"user",
        email:"test123@test.com",
        password: "Password123!"
      }).save()
      const _id = user._id;
      const post = await new Post({
        user: _id,
        message: "This is a new post",
        username: "Vishal101"
      }).save()
      const retrieved_post = await Post.findOne({ username: "Vishal101" }).populate("user");
      console.log(retrieved_post);
    } catch (err) {
      expect(err.errors.email.message).toEqual("Email already exists")
    }
  })
});
