var mongoose = require('mongoose');

require('../mongodb_helper')
var Trip = require('../../models/trips');

describe('Trip model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.trips.drop(function() {
          done();
      });
  });

  it('create new trip', function() {
    var trip = new Trip({ username: "x", destination: 'Spain', startDate: '10/05/2020', endDate: '11/05/2020' });
    expect(trip.username).toEqual('x');
    expect(trip.destination).toEqual('Spain');
    expect(trip.startDate.toString()).toEqual("Mon Oct 05 2020 00:00:00 GMT+0100 (British Summer Time)");
    expect(trip.endDate.toString()).toEqual( "Thu Nov 05 2020 00:00:00 GMT+0000 (Greenwich Mean Time)");
});
});
