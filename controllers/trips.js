var Trip = require('../models/trips');
var User = require('../models/user');

var TripsController = {
  New: function(req, res) {
    if(req.cookies.CurrentUser) {
      var username = req.cookies.CurrentUser
      res.render('trips/new', {username: username });
    } else {
      res.status(200).redirect('/user/signin');
    }
  },
/* eslint-disable */
  Create: function(req, res) {
    var trip = new Trip(req.body);
    trip.username = req.cookies.CurrentUser
    trip.save(function(err) {
      if (err) { throw err; }
      console.log(trip._id)
      User.findOneAndUpdate({name: trip.username}, {$push: {trips: trip._id }}, function (err) {
        if (err) { throw err};
      });
      res.status(201).redirect('/user/profile');
    });
  }
};
/* eslint-enable */
module.exports = TripsController;
