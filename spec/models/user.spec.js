var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

 
describe('User model', function() {
    beforeEach(function(done) {
        mongoose.connection.collections.users.drop(function() {
            done();
        });
    });
  

    it('user has an account', function() {
      var user = new User({ email: 'test@test.com', password: '1234' });
      expect(user.email).toEqual('test@test.com');
      expect(user.password).toEqual('1234');
    });
 //this saves the data into the database 
    it('can save a account', function(done) {
        var user = new User({ email: 'test@test.com', password: '1234' });
    
        user.save(function(err) {
          expect(err).toBeNull();
    
          User.find(function(err, user) {
            expect(err).toBeNull();
    
            expect(user[0]).toMatchObject({ email: 'test@test.com', password: '1234' });
            done();
          });
        });
      });

});
