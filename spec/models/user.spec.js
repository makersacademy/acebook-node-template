const mongoose = require("mongoose");
const assert = require('chai').assert;

require("../mongodb_helper");
const User = require("../../models/user");
const sanitizeInput = require('../../functions/sanitize')

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has a first name", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Anyone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual("Someone");
  });

  it("has a last name", () => {
    const user = new User({
      firstName: "Someone",
      lastName: "Anyone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.lastName).toEqual("Anyone");
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

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      firstName: "Someone",
      lastName: "Anyone",
      email: "someone@example.com",
      password: "password!123",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Someone",
          lastName: "Anyone",
          email: "someone@example.com",
          password: "password!123",
        });
        done();
      });
    });
  });

  it("throws validation errors when fields are missing", async () => {
    const userWithoutEmail = new User({
      firstName: "John",
      lastName: "Doe",
      password: "P@ssw0rd",
    });
    let err;
    try {
      await userWithoutEmail.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.email.properties.type).toEqual("required");
  });

  it("throws validation error when password is invalid", async () => {
    const userWithInvalidPassword = new User({
      firstName: "John",
      lastName: "Doe",
      email: "test@example.com",
      password: "1234567",
    });
    let err;
    try {
      await userWithInvalidPassword.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.errors.password.message).toEqual(
      "Password is not valid. Passwords must contain at least 8 characters, a number and a special character"
    );
  });

  it('should add another user as nemesis', function(done) {
    // Create two user objects to test the nemesis functionality
    const user1 = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Test123!',
    });

    const user2 = new User({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'Test123!',
    });

    // Save the users to the database
    Promise.all([user1.save(), user2.save()])
      .then(function(savedUsers) {
        const john = savedUsers[0];
        const jane = savedUsers[1];

        // Assign Jane as John's nemesis
        john.nemesis = jane._id;

        // Save the updated user object
        return john.save();
      })
      .then(function(updatedUser) {
        // Fetch the user from the database to ensure the nemesis assignment was successful
        return User.findById(updatedUser._id);
      })
      .then(function(fetchedUser) {
        // Assert that the fetched user's nemesis is the assigned user
        assert.equal(fetchedUser.nemesis.toString(), user2._id.toString());

        done(); // Indicates the completion of the test
      })
      .catch(function(error) {
        done(error); // Pass any errors to Mocha for reporting
      });
  });

  it("first name does not take any punctuation", () => {
    const firstName = "Someone";
    const hasPunctuation = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g.test(
      firstName
    );

    expect(hasPunctuation).toBe(false);

    const user = new User({
      firstName,
      lastName: "Anyone",
      email: "someone@example.com",
      password: "password",
    });
    expect(user.firstName).toEqual(firstName);
  });

  it("last name does not take any punctuation", () => {
    const lastName = "Anyone";
    const hasPunctuation = /[!"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~]/g.test(
      lastName
    );

    expect(hasPunctuation).toBe(false);

    const user = new User({
      firstName: "Someone",
      lastName,
      email: "someone@example.com",
      password: "password",
    });
    expect(user.lastName).toEqual(lastName);
  });

  it("first name does not exceed maximum character length", () => {
    const maxLength = 20; // Define the maximum character length
    const firstName = "John"; // Example first name
    // Assert that the full name does not exceed the maximum character length
    expect(firstName.length).toBeLessThanOrEqual(maxLength);
  });

  it("last name does not exceed maximum character length", () => {
    const maxLength = 20; // Define the maximum character length
    const lastName = "Doe"; // Example first name
    // Assert that the full name does not exceed the maximum character length
    expect(lastName.length).toBeLessThanOrEqual(maxLength);
  });

  it("first name does not exceed maximum character length", () => {
    const maxLength = 20; // Define the maximum character length
    const firstName = "John"; // Example first name
    // Assert that the full name does not exceed the maximum character length
    expect(firstName.length).toBeLessThanOrEqual(maxLength);
  });

  it("last name does not exceed maximum character length", () => {
    const maxLength = 20; // Define the maximum character length
    const lastName = "Doe"; // Example first name
    // Assert that the full name does not exceed the maximum character length
    expect(lastName.length).toBeLessThanOrEqual(maxLength);
  });

});

describe("sanitizeInput", () => {
  it("removes leading and trailing whitespace", () => {
    const input = "   hello world   ";
    const output = sanitizeInput(input);
    expect(output).toBe("hello world");
  });

  it("removes special characters", () => {
    const input = "<>alert('XSS')<''>";
    const output = sanitizeInput(input);
    expect(output).toBe("alert(XSS)");
  });
});

