const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

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

  // it('throws error when email is already taken', async () => {
  //   const firstUser = new User({
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'test@example.com',
  //     password: 'P@ssw0rd'
  //   });
  //   await firstUser.save();

  //   const secondUser = new User({
  //     firstName: 'Jane',
  //     lastName: 'Doe',
  //     email: 'test@example.com',
  //     password: 'P@ssw0rd'
  //   });

  //   try {
  //     secondUser.save()
  //   } catch (error) {
  //     console.log(error.message)
  //   }

    //E11000 duplicate key error collection: acebook.users index: email_1 dup key: { email: "simon@chipmunks.com" }
  

    
    // if (err && err.code === 11000) {
    //   expect(err.keyPattern.email).toBeDefined();
    //   // Add any additional expectations for duplicate key errors here...
    // } else {
    //   err = null;
    //   expect(err).toBeNull(); // Or add another expectation for other error types
    // }

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