var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/signup');

describe('Signup model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.myusers.drop(function() {
          done();
      });
  });

  it('has an email address', function() {
    var user = new User({ firstname: 'John', secondname: 'Smith', email: 'johnsmith@yahoo.com', password: 'password1' });
    expect(user.email).toEqual('johnsmith@yahoo.com');
  });
});
