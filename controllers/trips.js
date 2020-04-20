var Trip = require('../models/trips');
var User = require('../models/user');

var sendMail = require('../sendMail.js');
console.log(sendMail)

var TripsController = {
// import { companionEmailSend } from '../sendMail.js';
// import '../sendMail.js';
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
    if(req.body.companionEmails.includes("@")) {
    trip.username = req.cookies.CurrentUser
    trip.companionEmails.push(req.cookies.UserEmail)
    trip.save(function(err) {
      if (err) { throw err; }
      sendMail.companionEmailSend(trip.companionEmails[0], trip.username)
      User.findOneAndUpdate({name: trip.username}, {$push: {trips: trip._id }}, function (err) {
        if (err) { throw err};
      });
    })
  }

  if (!req.body.companionEmails.includes("@")) {
    trip.companionEmails.pop()
    trip.companionEmails.push(req.cookies.UserEmail)
    trip.save(function(err) {
      if (err) { throw err; }
      User.findOneAndUpdate({name: trip.username}, {$push: {trips: trip._id }}, function (err) {
        if (err) { throw err};
      });
    })
  }
  res.status(201).redirect('/user/profile');
    /* eslint-enable */
 },

  Delete: function(req, res) {
    Trip.deleteOne({_id: req.params.id}, function (err) {
      if (err) { throw err}
    });
    res.redirect('/user/profile');
    },

  View: function(req, res) {
    var username = req.cookies.CurrentUser
      if (req.cookies.CurrentUser) {
    Trip.findById(req.params.id, function(err, trip){
      if(err) {throw err}

      if(req.cookies.editDates){
        res.render('trips/view', {trip: trip, username: username, editDate: true})
      } else {
        res.clearCookie('editDates')
        res.render('trips/view', {trip: trip, username: username, editDate: false})
      }
    })
    }
    else {
      res.status(200).redirect('/user/signin')
    }
  },


  EditData: function(req, res) {

    res.cookie('editDates', true)
    res.redirect('/trips/view/' + req.params.id)
  },

  SaveEdits: function(req, res) {
    res.clearCookie('editDates')
    res.redirect('/trips/view/' + req.params.id)
  },

  Edit: function(req, res){
    var dataKey = Object.keys(req.body)[0]
    var newData = Object.values(req.body)[0]
    const query = {}
    query[dataKey] = newData
    var tripId = req.params.id
    Trip.findOneAndUpdate({_id: tripId}, query, function (err) {
      if (err) { throw err}
    });
    res.redirect('/trips/view/' + req.params.id)
  },


  AddUser: function(req, res){
    var email = req.body.companionEmails
    console.log(req.body.companionEmails)
    var tripId = req.params.id
  console.log("******")
    console.log(email)
console.log("******")
    Trip.findOneAndUpdate({_id: tripId}, {$push: {companionEmails: email}}, function (err, trip) {
      console.log("******")
      console.log(email)
      if (err) { throw err}
      sendMail.companionEmailSend(email, trip.username)
    });
    res.redirect('/trips/view/' + req.params.id)
  },

  //I added the AddFlights property below to push the flight information into a nested database but get the error message 'MongooseError [CastError]: Cast to ObjectId failed for value "undefined" at path "_id" for model "Trip"'

  AddFlights: function(req, res){
    var tripId = req.params.id;
    var flight = req.body
    Trip.findOneAndUpdate({_id: tripId}, {$push: {flights: flight}}, function (err) {
      if (err) { throw err}
    });
    res.redirect('/trips/view/' + req.params.id)
  },

  AddAccommodation: function(req, res){
    var tripId = req.params.id;
    var accommodation = req.body
    Trip.findOneAndUpdate({_id: tripId}, {$push: {accommodations: accommodation}}, function (err) {
      if (err) { throw err}
    });
    res.redirect('/trips/view/' + req.params.id)
  },

  // EndDate: function(req, res){
  //   var newDate = req.body.endDate
  //   var tripId = req.params.id
  //   Trip.findOneAndUpdate({_id: tripId}, {endDate: newDate }, function (err) {
  //     if (err) { throw err};
  //   });
  //   res.redirect('/trips/view/' + req.params.id)
  // },

};

module.exports = TripsController;
