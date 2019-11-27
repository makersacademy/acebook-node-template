var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

require("../mongodb_helper");
var User = require("../../models/user");

describe("User model", function() {
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
      done();
    });
  });

  it("has a First name, surname, email, password and dob", () => {
    const user = new User({
      firstName: "Terry",
      surname: "Wogan",
      email: "terry@wogan.com",
      password: "pudsey",
      dob: "03/08/1938"
    });

    expect(user.firstName).toEqual("Terry");
    expect(user.surname).toEqual("Wogan");
    expect(user.email).toEqual("terry@wogan.com");
    expect(user.dob).toEqual("03/08/1938");
  });

  it("can list all users", function(done) {
    User.find(function(err, users) {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", function(done) {
    var salt = bcrypt.genSaltSync(10);
    var passwordHash = bcrypt.hashSync("pudsey", salt);
    const user = new User({
      firstName: "Terry",
      surname: "Wogan",
      email: "terry@wogan.com",
      password: passwordHash,
      dob: "03/08/1938"
    });

    user.save(function(err) {
      expect(err).toBeNull();

      User.find(function(err, users) {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          firstName: "Terry",
          surname: "Wogan",
          email: "terry@wogan.com",
          dob: "03/08/1938"
        });

        expect(bcrypt.compareSync("pudsey", users[0].password)).toBe(true);
        done();
      });
    });
  });
});
