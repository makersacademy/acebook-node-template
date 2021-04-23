var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
      done();
    });
  });

  it('has an email input', function(){
    var user = new User({ email: 'email@test.co.uk' , password: 'test123'});
    expect(user.email).toEqual('email@test.co.uk');
  });


})
