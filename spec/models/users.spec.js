var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  // beforeEach(function(done) {
  //   mongoose.connection.collections.user.drop(function() {
  //     done();
  //   });
  // });

  it('firstName is saved', function() {
    var user = new User({firstName: "John"});
    expect(user.firstName).toEqual('John');
  });

  it('lastName is saved', function(){
    var user = new User({lastName:'Zoidberg'});
    expect(user.lastName).toEqual('Zoidberg');
  });

  it('email is saved', function(){
    var user = new User({email:'Zoidberg@planetexpress.com'});
    expect(user.email).toEqual('Zoidberg@planetexpress.com');
  });

  it('password is saved', function(){
    var user = new User({password:'12345'});
    expect(user.password).toEqual('12345');
  });

  it('id is saved', function(){
    var user = new User();
    expect(user._id).toBeInstanceOf(Object);
  });
});
