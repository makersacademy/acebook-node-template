const mongoose = require("mongoose");

require("../mongodb_helper");
const User = require("../../models/user");
const bcrypt = require('bcrypt');

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
      name: "name",
      surname: "surname",
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "name",
      surname: "surname",
    });
    expect(user.password).toEqual("password");
  });

  it("has a name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "name",
      surname: "surname",
    });
    expect(user.name).toEqual("name");
  });

  it("has a name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      name: "name",
      surname: "surname",
    });
    expect(user.surname).toEqual("surname");
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
      name: "name",
      surname: "surname",
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({
          email: "someone@example.com",
          password: "password",
          name: "name",
          surname: "surname",
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
      name: "name", 
      surname: "surname",
    });
    user1.save((err) => {
      expect(err).toBeNull();
      User.find((err, users) => {
        expect(err).toBeNull();
        expect(users[0]).toMatchObject({
          email: "test@duplicate.com",
          password: "password",
          name: "name",
          surname: "surname",
        });
        // Creating another user with same email
        const user2 = new User({
          email: "test@duplicate.com",
          password: "password",
          name: "name",
          surname: "surname",
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
  it('mocks the bcrypt password', (done) => {
    // mocking bcrypt.hash
    jest.spyOn(bcrypt, 'hash').mockImplementation((password, saltRounds, cb) => cb(null, 'hashedPassword'));  
    
    // calling the mocked bcrypt.hash
    bcrypt.hash('original-password', 3, function (err, hashedPassword) {
      const user = new User({
        email: 'test2@bcrypt.com',
        password: hashedPassword,
        name: 'firstName',
        surname: 'surname'
      });
      console.log(user);

      // saving user to database
      user.save((err) => {
        expect(err).toBeNull();
        
        // User.find is to confirm it is in the 
        User.find((err, users) => {
          expect(err).toBeNull();
          expect(users[0]).toMatchObject({
            email: 'test2@bcrypt.com',
            password: 'hashedPassword',
            name: 'firstName',
            surname: 'surname'
          });
          done();
        });
      });
    });
  });
  it('confirms correct password against hashed password through bcrypt', (done) => {
    // mocking bcrypt.hash
    jest.spyOn(bcrypt, 'hash').mockImplementation((password, saltRounds, cb) => cb(null, 'hashedPassword'));

    // calling the mocked bcypt.hash
    bcrypt.hash('original-password', 3, function (err, hashedPassword) {
      // creating a user
      const user = new User({
        email: 'test@bcrypt.com',
        password: hashedPassword,
        name: 'firstName',
        surname: 'surname'
      });
      console.log(user);

      // saving user to database
      user.save((err) => {
        expect(err).toBeNull();

        // log in using test@bcrypt.com
        // searching the user from database using the email, naming the database search return to returnedUser
        User.findOne({email: 'test@bcrypt.com'}).then((returnedUser) => {

          // mocking bcrypt.compare
          jest.spyOn(bcrypt, 'compare').mockImplementation((password, hashedPassword, cb) => cb(null, true));

          // calling the mocked bcrypt.compare
          bcrypt.compare('original-password', returnedUser.password, function (err, hashComparison) {
            
            // in real case, we assign the returned User to session
            // here we expect the returned user to be the user who was trying to log in
            expect(returnedUser).toMatchObject({
              email: 'test@bcrypt.com',
              password: 'hashedPassword',
              name: 'firstName',
              surname: 'surname'
            });
            done();
          });
        });
      });
    });
  });
})
