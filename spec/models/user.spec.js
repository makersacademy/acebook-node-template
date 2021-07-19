var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function(){
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
        done();
    });
  });

  it('can create a user', function(){
    var user = new User({ username: 'anita', email: 'anita600@a.com', password: 'hello123' });
    expect(user.username).toEqual('anita');
    expect(user.email).toEqual('anita600@a.com');
    expect(user.password).toEqual('hello123');
  })
})