const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
require("../mongodb_helper");
const User = require("../../models/user");

const createAndValidateUser = async(obj) => {
  const user = new User(obj);
  await user.validate();
  return user;
};

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });


  it("requires email to be unique", async () => {
    const existingUser1 = new User({
      email: "existing@example.com",
      password: "password123",
      username: "existinguser1",
    });
  
    // Create another user with the same email
    const existingUser2 = new User({
      email: "existing@example.com",
      password: "password456",
      username: "existinguser2",
    });
  
  
    await existingUser1.save();
 
    try {
      await existingUser2.save();
    } catch (error) {
      expect(error.errors["email"].message).toBe("Email address is already in use");
    }
  });})
  it("requires password to be at least 8 characters", async () => {

    const user = new User({
      email: "test@example.com",
      password: "pass",
      username: "testuser",
    });
  
    try {
      await user.save();
    } catch (error) {
      expect(error.errors["password"].message).toBe(
        "Path `password` (`pass`) is shorter than the minimum allowed length (8)."
      );
    }
  });

  

  it("should not allow creating a user with an existing username", async () => {
  
  const existingUser1 = new User({
    email: "existing1@example.com",
    password: "password123",
    username: "existinguser",
  });

  
  await existingUser1.save();

 
  const existingUser2 = new User({
    email: "existing2@example.com",
    password: "password456",
    username: "existinguser",
  });


  try {
    await existingUser2.save();
  } catch (error) {
    expect(error.errors["username"].message).toBe("Username is already in use");
  }
});

it("disallows trailing whitespace in username", async () => {
  const user = new User({
    email: "existing2@example.com",
    password: "password456",
    username: "banana  ",
  });

  try {
    await user.validate(); 
  } catch (error) {
    expect(error.errors["username"].message).toBe("Username cannot have trailing whitespace");
  }
});

it("disallows trailing whitespace in password", async () => {
  const user = new User({
    email: "existing2@example.com",
    password: "password456  ",
    username: "banana",
  });

  try {
    await user.validate(); 
  } catch (error) {
    expect(error.errors["password"].message).toBe("Password cannot have trailing whitespace");
  }
});

it("disallows trailing whitespace in email", async () => {
  const user = new User({
    email: "existing2@example.com   ",
    password: "password456",
    username: "banana  ",
  });

  try {
    await user.validate(); 
  } catch (error) {
    expect(error.errors["email"].message).toBe("Email cannot have trailing whitespace");
  }
});


it("can list several users", async () => {
  const user = await createAndValidateUser({
    username: "peter",
    email: "someone@example.com",
    password: "password",
  });

  const user2 = await createAndValidateUser({
    username: "bob",
    email: "someone2@example.com",
    password: "pass2word",
  });

  await user.save();
  await user2.save();

  const users = await User.find();
  const hashedPassword1 = await bcrypt.hash(user.password, 8);
  const hashedPassword2 = await bcrypt.hash(user2.password, 8);

  expect(users).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        username: "peter",
        email: "someone@example.com",
        // password: hashedPassword1,
      }),
      expect.objectContaining({
        username: "bob",
        email: "someone2@example.com",
        // password: hashedPassword2,
      }),
    ])
  );
});