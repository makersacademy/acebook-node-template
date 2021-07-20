var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function(){

  beforeAll(function(done) {
    mongoose.connection.collections.users.drop(function() {
        done();
    });
    
  });

  it('can create a user', function(done){
    var user = new User({ username: 'anita', email: 'anita600@a.com', password: 'hello123' });

    user.save(function(err){
      if(err) { console.log(err) } 

      User.find(function(err, users) {
        if(err) { console.log(err) }
        
        expect(users[0]).toMatchObject({ username: 'anita', email: 'anita600@a.com', password: 'hello123', active: false });

        done();
      });

    });
  });
  
  it('can sign in a user', function(done){

    var user = new User({ username: 'kelvin', email: 'kelvin@example.com', password: 'nicolasturgeon1' });

    user.save(function(err){
      if(err) { console.log(err) } 

      User.find(function(err, users) {
        if(err) { console.log(err) }

        expect(users[1]).toMatchObject({ username: 'kelvin', email: 'kelvin@example.com', password: 'nicolasturgeon1', active: false });

        users[1].active = true;
        users[1].save();

        expect(users[1]).toMatchObject({ username: 'kelvin', email: 'kelvin@example.com', password: 'nicolasturgeon1', active: true });

        done();
      });

    });
  });
    
    
});
