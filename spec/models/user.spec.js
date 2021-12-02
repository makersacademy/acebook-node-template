var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

 
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
 
    it('can save a user and retrive user from the database', function(done) {
        var user = new User({ email: 'test@test.com', password: '1234' });
    //this saves the data into the database 
        user.save(function(err) {
          expect(err).toBeNull();
    //retrieving user from the database
          User.find(function(err, user) {
            expect(err).toBeNull();
    
            expect(user[0]).toMatchObject({ email: 'test@test.com', password: '1234' });
            done();
          });
        });
      });

});
