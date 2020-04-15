var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/post');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('create new user', function() {
    var user = new User({ username: 'user1', email: 'user1@gmail.com', password: '321' });
    expect(user.username).toEqual('user1');
    expect(user.email).toEqual('user1@gmail.com');
    expect(user.password).toEqual('321');
  });

  it('can save new user details', function(done) {
    var user = new User({ username: 'user1', email: 'user1@gmail.com', password: '321'});

    user.save(function(err) {
      expect(err).toBeNull();

      User.find(function(err, user) {
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({ username: 'user1', email: 'user1@gmail.com', password: '321' });
        done();
      });
    });
  });
});
