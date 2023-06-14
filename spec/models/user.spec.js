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
  
    it("can list several users", (done) => {
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
                  // password: bcrypt.hash("password",10)
                }),
                expect.objectContaining({
                  username: "bob",
                  email: "someone2@example.com",
                  // password: bcrypt.hash("pass2word", 10)
                }),
              ])
            );
            done();
          });
        });
      });
    });
  })