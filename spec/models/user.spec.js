const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const UserController = require("../../controllers/users")
const sinon = require('sinon');

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

  it("has a last name", ()=> {
    const user = new User({
      firstName: "Someone",
      lastName:"Anyone",
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
      lastName:"Anyone",
      email: "someone@example.com",
      password: "password!123",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Someone",
          lastName:"Anyone",
          email: "someone@example.com",
          password: "password!123",
        });
        done();
      });
    });
  });

  it('throws validation errors when fields are missing', async () => {
    const userWithoutEmail = new User({
      firstName: 'John',
      lastName: 'Doe',
      password: 'P@ssw0rd'
    });
    let err;
    try {
      await userWithoutEmail.save();
    } catch (error) {
      err = error
    }
    expect(err).toBeDefined();
    expect(err.errors.email.properties.type).toEqual('required');
  });

  it('should return an error if user already exists', (done) => {
    const req = {
      body: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: 'password!123'
      }
    };
    const res = {
      status: (code) => {
        expect(code).toEqual(400);
        return {
          render: (view, options) => {
            expect(view).toEqual('users/new');
            expect(options.error).toEqual('Email address already taken');
            done();
          }
        };
      }
    };
    // Simulate finding an existing user with the same email address
    User.findOne = sinon.stub().yields(null, { email: 'johndoe@example.com' });

    UserController.Create(req, res);
  });

  it('throws validation error when password is invalid', async () => {
    const userWithInvalidPassword = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: '1234567'
    });
    let err;
    try {
      await userWithInvalidPassword.save();
    } catch (error) {
      err = error
    }
    expect(err).toBeDefined();
    expect(err.errors.password.message).toEqual('Password is not valid. Passwords must contain at least 8 characters, a number and a special character');
  });

  it('adds and removes friends successfully', async () => {
    const user = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'P@ssw0rd'
    });
    await user.save();

    const friend1 = mongoose.Types.ObjectId();
    const friend2 = mongoose.Types.ObjectId();

    user.friends.push(friend1);
    user.friends.push(friend2);
    await user.save();

    expect(user.friends.length).toBe(2);

    user.friends.pull(friend1);
    await user.save();

    expect(user.friends.length).toBe(1);
    expect(user.friends[0]).toEqual(friend2);
  });
});