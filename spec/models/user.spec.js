var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.user.drop(function() {
        done();
    });

    it('user has an email address', function() {
      var user = new User({ email: 'test@test.com', password: '1234' });
      expect(user.email).toEqual('test@test.com');
    });

    it('user has an email address', function() {
      var user = new User({ email: 'test@test.com', password: '1234' });
      expect(user.password).toEqual('1234');
    });
  });

});