const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collection('users').deleteMany({}, () => {
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
      password: "password",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
        });
        done();
      });
    });
  });
  it("it can't save a user, if the same user already exists", (done) => {
  
    // To create one user
    const user1 = new User({
      email: "test@duplicate.com",
      password: "password",
    });
    user1.save((err) => {
      expect(err).toBeNull();
      User.find((err, users) => {
        expect(err).toBeNull();
        expect(users[0]).toMatchObject({
          email: "test@duplicate.com",
          password: "password",
        });
        // Creating another user with same email
        const user2 = new User({
          email: "test@duplicate.com",
          password: "password",
        });
  
        // Expecting Mongo Error E11000 -> duplicate entry in a unique key
        // MongoError: 'E11000 duplicate key error collection: acebook_test.users index: email_1 dup key: { email: "test@duplicate.com" }'
        const errorE11000 = async () => {
          await user2.save();
        }
        expect(errorE11000()).rejects.toThrow();
  
        // expect there is only one user
        User.find((err, users) => {
          expect(err).toBeNull();
          expect(users.length).toEqual(1);
          done();
        });
      });
    });
  });
  it('mocks the bcrypt password',  () => {
    jest.spyOn(bcrypt, 'hash').mockImplementation((password, saltRounds, cb) => cb(null, hashPassword){
        const user = new User({email: email, password: hashedPassword});
        console.log(user);
        user.save((err) => {
          if (err) {
            console.log(err);
            res.status(409).render("users/new", { error: 'User already exists!' });
          } else {
          res.status(201).redirect("/posts");
          }
        });
      });  

      
    })
  })
});

