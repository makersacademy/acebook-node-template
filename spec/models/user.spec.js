require('../mongodb_helper');
const mongoose = require('mongoose');

const User = require('../../models/user');

describe('User model', function () {
  beforeEach(function (done) {
    mongoose.connection.collections.users.drop(function () {
      done();
    });
  });

  it('has a user', function () {
    let user = new User({
      name: 'Harry Potter',
      email: 'harry@example.com',
      password: 'snitch'
    });
    expect(user.name).toEqual('Harry Potter');
    expect(user.email).toEqual('harry@example.com');
    expect(user.password).toEqual('snitch');
  });
});
