var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('create new user', function() {
    var user = new User({ name: 'user1', email: 'user1@gmail.com', password: '321' });
    expect(user.name).toEqual('user1');
    expect(user.email).toEqual('user1@gmail.com');
    expect(user.password).toEqual('321');
  });
});
