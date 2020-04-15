var mongoose = require('mongoose');

var TripSchema = new mongoose.Schema({
  username: String,
  destination: String,
  startDate: Date,
  endDate: Date
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;