var mongoose = require("mongoose");
var bcrypt = require('bcryptjs');

require("../mongodb_helper");
var User = require("../../models/user");

describe("User model", function() {
  var user;
  var salt = bcrypt.genSaltSync(10);
  var passwordHash = bcrypt.hashSync("pudsey", salt);


  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
      done();
    });    
    user = new User({
      firstName: "Terry",
      surname: "Wogan",
      email: "terry@wogan.com",
      password: passwordHash,
      dob: "03/08/1938"
    });
  });

  it("has a First name, surname, email, password and dob", () => {
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
        expect(users.length).toBe(1)
        done();
      });
    });
  });

  it('after sign up we should be able to login user', function(done) {
    user.save(function(err) {
      expect(err).toBeNull();

      User.findOne({email: user.email}, function(err, returnedUser) {
        if (err) return err;
        expect(returnedUser.email).toBe('terry@wogan.com');
        expect(bcrypt.compareSync("pudsey", returnedUser.password)).toBe(true);
        done();
      });
    });
  });
});
