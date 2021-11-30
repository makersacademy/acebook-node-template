'use strict';

var mongoose = require('mongoose');
var User = require('../../models/user');

require('../mongodb_helper')

describe('User model', function() {
    beforeEach(function(done) {
        mongoose.connection.collections.users.drop(function() {
            done();
        });  
    });

    it('user has an email and password property', function() {
      var user = new User({ email: 'test@test.com', password: '1234' });
      expect(user.email).toEqual('test@test.com');
      expect(user.password).toEqual('1234');
    });

    it('Can test if an encrypted password matches', function(done) {
      var user = new User({ email: 'happy@test.com', password: '098' });
      user.save(function(err) {
        expect(err).toBeNull();
        User.find({ email: 'happy@test.com' }, function(err, user) {
          if (err) throw err; 
          user[0].comparePassword('098', function(err, isMatch) {
            if (err) throw err;
            expect(isMatch).toBe(true); 
            done(); 
          }); 
        });
      });
    }); 

    it('Can test if an encrypted password does not match', function(done) {
      var user = new User({ email: 'happy@test.com', password: '098' });
      user.save(function(err) {
        expect(err).toBeNull();
        User.find({ email: 'happy@test.com' }, function(err, user) {
          if (err) throw err; 
          user[0].comparePassword('12345', function(err, isMatch) {
            if (err) throw err;
            expect(isMatch).toBe(false); 
            done(); 
          }); 
        });
      });
    }); 

}); 
