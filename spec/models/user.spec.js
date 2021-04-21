var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });

  it('has a name', function() {
    var user = new User({ username: 'Mike' });
    expect(user.username).toEqual('Mike');
  });

  it('can save a user', function(done) {
    var user = new User({ username: 'Mike' });

    user.save(function(err) {
      expect(err).toBeNull();

      User.find(function(err, users) {
        expect(err).toBeNull();
        expect(users[0].username).toEqual('Mike');
        done();
      });
    });
  });
});