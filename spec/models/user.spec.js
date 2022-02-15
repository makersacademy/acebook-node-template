var mongoose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
    mongoose.connection.collections.users.drop(function() {
        done();
    });
  });
    it('can add a user', function() {
      var user = new User({ email: 'rosie@rosie.com', password: '123', firstname: 'Rosie', surname: 'Waite'  });
      expect(user.email).toEqual('rosie@rosie.com');
      expect(user.password).toEqual('123');
      expect(user.firstname).toEqual('Rosie');
      expect(user.surname).toEqual('Waite');
    });

  });
