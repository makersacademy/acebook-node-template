var mongoose = require('mongoose');

//FlightSchema is the child schema of TripSchema
// var FlightSchema = new mongoose.Schema({
//   departureCity: String,
//   airport: String,
//   airline: String,
//   date: Date,
//   flightNumber: String,
//   departureTime: String,
//   bookingReference: String
// })

var TripSchema = new mongoose.Schema({
  username: String,
  destination: String,
  startDate: Date,
  endDate: Date,
  companionEmails: Array,
  flights: Array,
  accommodations: Array,
  chatMessages: Array,
  activities: Array
});

var Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;
