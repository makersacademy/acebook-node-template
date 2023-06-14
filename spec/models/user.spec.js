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


  it("requires email to be unique", () => {
    const existingUser = createAndValidateUser({
      email: "existing@example.com",
      password: "password123",
      username: "existinguser",
    });
    expect(existingUser.errors["email"].message).toBe(
      "Email address is already in use"
    );
  });
})
  // it("requires password to be at least 8 characters", () => {
  //   const error = createAndValidateUser( {
  //     "test@example.com",
  //     "pass",
  //     "testuser" }
  //   );
  //   expect(error.errors["password"].message).toBe(
  //     "Password is too short. At least 8 characters."
  //   );
  // });

//   it("requires username to be unique", () => {
//     const existingUser = createAndValidateUser(
//       {
//         email: "existing@example.com",
//         password: "password123",
//         username: "existinguser",
//       }
//     );
//     expect(existingUser.errors["username"].message).toBe(
//       "Username is already in use"
//     );
//   });
// });
  // it("should not allow creating a user with an existing username", (done) => {
  //   const existingUser = new User({
  //     email: "existing@example.com",
  //     password: "password123",
  //     username: "existinguser",
  //   });

  //   existingUser.save((err) => {
  //     expect(err).toBeNull();

  //     const newUser = new User({
  //       email: "new@example.com",
  //       password: "newpassword",
  //       username: "existinguser", // Same username as existingUser
  //     });

  //     newUser.save((err) => {
  //       expect(err).not.toBeNull();
  //       expect(err.code).toEqual(11000); // Duplicate key error

  //       done();
  //     });
  //   });
  // });

  // it("should not allow creating a user with a too short password", (done) => {
  //   const newUser = new User({
  //     email: "new@example.com",
  //     password: "short", // Password is too short (less than 8 characters)
  //     username: "newuser",
  //   });

  //   newUser.save((err) => {
  //     expect(err).not.toBeNull();
  //     expect(err.errors.password.message).toContain(
  //       "Passwords is too short. At least 8 characters."
  //     );

  //     done();
  //   });
  // });


  // it("can list several users", async (done) => {
  //   const user = new User({
  //     username: "peter",
  //     email: "someone@example.com",
  //     password: "password",
  //   });

  //   const user2 = new User({
  //     username: "bob",
  //     email: "someone2@example.com",
  //     password: "pass2word",
  //   });

  //   const hashedPassword1 = await bcrypt.hash(user.password, 8);
  //   const hashedPassword2 = await bcrypt.hash(user2.password, 8)

  //   user.save((err) => {
  //     expect(err).toBeNull();
  //     user2.save((err) => {
  //       expect(err).toBeNull();

  //       User.find((err, users) => {
  //         expect(err).toBeNull();
  //         expect(users).toEqual(
  //           expect.arrayContaining([
  //             expect.objectContaining({
  //               username: "peter",
  //               email: "someone@example.com",
  //               // password: hashedPassword1,
  //             }),
  //             expect.objectContaining({
  //               username: "bob",
  //               email: "someone2@example.com",
  //               // password: hashedPassword2,
  //             }),
  //           ])
  //         );
  //         done();
  //       });
  //     });
  //   });
  // });
