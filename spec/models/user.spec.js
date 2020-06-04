var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user')

describe('User model', function(){
  beforeEach(function(done){
    mongoose.connection.collections.users.drop(function() {
      done();
      // console.log("how many times are we here ?")
    });
  });

  afterEach(function(done){
    mongoose.connection.collections.users.drop(function() {
      done();
        // console.log("how many times are we here ?")
    });
  });
  
  it('has a first name', function(done){
    var user = new User({firstName: 'John', lastName: 'Matthew', email: 'john@example.com', password: '12345'});
    expect(user.firstName).toEqual('John');
    expect(user.lastName).toEqual('Matthew');
    expect(user.email).toEqual('john@example.com');
    expect(user.password).toEqual('12345');
    done();
  });

  it('has to have a unique email address', function(done){
    var user = new User({firstName: 'John2', lastName: 'Matthew', email: 'john@example.com', password: '12345'});
    var user2 = new User({firstName: 'Sarah1', lastName: 'Smith', email: 'john@example.com', password: '12345'});

    user.save(function(err){
    expect(err).toBeNull();

    expect(user2.save).toThrow();
  //   user2.save(function(err){
  //   expect(err).toThrow();
  // });
    done();
  });
});

  it('can save a user', function(done){
    var user = new User({firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', password: '12345'});
    var user2 = new User({firstName: 'John', lastName: 'Matthew', email: 'james@gmail.com', password: '12345'});

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
