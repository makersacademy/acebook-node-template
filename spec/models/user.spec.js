const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("can list several users", async (done) => {
    const user = new User({
      username: "peter",
      email: "someone@example.com",
      password: "password",
    });

    const user2 = new User({
      username: "bob",
      email: "someone2@example.com",
      password: "pass2word",
    });

    const hashedPassword1 = bcrypt.hash(user.password);
    const hashedPassword2 = bcrypt.hash(user2.password);



    user.save((err) => {
      expect(err).toBeNull();
      user2.save((err) => {
        expect(err).toBeNull();

        User.find((err, users) => {
          expect(err).toBeNull();
          expect(users).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                username: "peter",
                email: "someone@example.com",
                password: hashedPassword1,
              }),
              expect.objectContaining({
                username: "bob",
                email: "someone2@example.com",
                password: hashedPassword2,
              }),
            ])
          );
          done();
        });
      });
    });
  });
});