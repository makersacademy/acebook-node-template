var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.users.drop(function() {
        done();
      });
  });

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

  it('can save a user', function(done){
    var testuser = new User({firstName: 'John', lastName: "Zoidberg", email: 'Zoidberg@planetexpress.com', password: '12345' })

    testuser.save(function(err){
      expect(err).toBeNull();

    User.find(function(err, users){
      expect(err).toBeNull();

      expect(users[0]).toMatchObject({firstName: 'John'});
      expect(users[0]).toMatchObject({lastName: 'Zoidberg'});
      expect(users[0]).toMatchObject({email: 'Zoidberg@planetexpress.com'});
      expect(users[0]).toMatchObject({password: '12345'});

      done();
    });      
  });
 });
});
