var moongose = require('mongoose');

require('../mongodb_helper')
var User = require('../../models/user');

describe('User model', ()=>{
  beforeEach (function(done){
    moongose.connection.collections.users.drop(function() {
      done();
    });
  });

  it('has an email', ()=> {
    var user = new User({ email: 'test@test.com', password: 'secrets'});
    expect(user.email).toEqual('test@test.com')
  });

  it('has a password', ()=> {
    var user = new User({ email: 'test@test.com', password: 'secrets'});
    expect(user.password).toEqual('secrets')
  });


});