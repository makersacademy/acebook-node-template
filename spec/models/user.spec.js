var mongoose = require('mongoose');
require('../mongodb_helper')
var Post = require('../../models/user');

describe('User model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.user.drop(function() {
          done();
      });
  });


  
});
