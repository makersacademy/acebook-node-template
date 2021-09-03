var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/users');

describe('User model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
        done();
    });
});

  it('saves a user', function(done) {
    var user = new User({ name: 'jim' });

    user.save(function(err) {
      expect(err).toBeNull();

      User.find(function(err, user) {
        expect(err).toBeNull();

        expect(user[0]).toMatchObject({ name: 'jim' });
        done();
      });
    });
  });
});