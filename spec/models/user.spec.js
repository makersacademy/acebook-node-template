var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

 
describe('Post model', function() {
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

});
