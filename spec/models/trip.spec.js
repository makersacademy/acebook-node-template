var mongoose = require('mongoose');

require('../mongodb_helper')
var Trip = require('../../models/trip');

describe('Trip model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.trips.drop(function() {
          done();
      });
  });

  it('create new trip', function() {
    var trip = new Trip({ username: "x", destination: 'Spain', datefrom: '10/05/2020', dateto: '13/05/2020' });
    expect(trip.username).toEqual('x');
    expect(trip.destination).toEqual('Spain');
    expect(trip.datefrom).toEqual('10/05/2020');
    expect(trip.dateto).toEqual('13/05/2020');
});
