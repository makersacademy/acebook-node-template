var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user')

describe('User model', function() {
  beforeEach(function(done){
    mongoose.connection.collections.users.drop(function() {
    done();
    });
  });
  
  it('has a first name', function(){
    var user1 = new User({firstName: 'John', lastName: 'Matthew', email: 'john@example.com', password: '12345'}); //TODO: Mock users
    expect(user1.firstName).toEqual('John');
    expect(user1.lastName).toEqual('Matthew');
    expect(user1.email).toEqual('john@example.com');
    expect(user1.password).toEqual('12345');
  });

  it('has to have a unique email address', function(done){
    var user = new User({firstName: 'John2', lastName: 'Matthew', email: 'john@example.com', password: '12345'});
    var user2 = new User({firstName: 'Sarah1', lastName: 'Smith', email: 'john@example.com', password: '12345'});
    user.save(function(err){
    expect(err).toBeNull();
    expect(user2.save).toThrow();
    done();
  });
});

  it('can save a user', function(done){
    var user1 = new User({firstName: 'John', lastName: 'Matthew', email: 'john@example.com', password: '12345'}); //TODO: Mock users
    var user2 = new User({firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', password: '123456'});  
    user1.save(function(err){
      expect(err).toBeNull();

    user2.save(function(err){
      expect(err).toBeNull();

      User.find(function(err, users){
        expect(err).toBeNull();
        expect(users[1]).toMatchObject({firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', password: '123456'});
        done();
       }); 
      });
    });
  });  
});