var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user')

describe('User model', function(){
  beforeEach(function(done){
    mongoose.connection.collections.users.drop(function() {
      done();
    });
  });

  it('has a first name', function(){
    var user = new User({firstName: 'John', lastName: 'Matthew', email: 'john@example.com', password: '12345'});
    expect(user.firstName).toEqual('John');
    expect(user.lastName).toEqual('Matthew');
    expect(user.email).toEqual('john@example.com');
    expect(user.password).toEqual('12345');
  });

  it('can save a user', function(done){
    var user = new User({firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', password: '12345'});
    var user2 = new User({firstName: 'John', lastName: 'Matthew', email: 'john@example.com', password: '12345'});

    user.save(function(err){
      expect(err).toBeNull();

    user2.save(function(err){
      expect(err).toBeNull();

      User.find(function(err, users){
        expect(err).toBeNull();

        expect(users[0]).toMatchObject({firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', password: '12345'});
        done();
      });
    });
  });
  });
});
