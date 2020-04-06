var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
          done();
      });
  });
  it('has a user', function() {
    var user = new User({ username: 'derpygary'});
    expect(user.username).toEqual('derpygary');
  });


});
