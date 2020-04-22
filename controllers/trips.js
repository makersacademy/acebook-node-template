var Trip = require('../models/trips');
var User = require('../models/user');
var sendMail = require('../sendMail.js');
var getDates = require('../dates.js');

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
    trip.username = req.cookies.CurrentUser
    if(req.body.companionEmails.includes("@")) {
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
    setTimeout(function(){res.redirect('/user/profile');}, 500);
    },

  Leave: function(req, res) {
      Trip.findOne({_id: req.params.id}, function (err, trip) {
        if (err) { throw err}
        var i = trip.companionEmails.indexOf(req.cookies.UserEmail)
        trip.companionEmails.splice(i, 1)
        trip.save(function(err){
          if(err) {throw err}
        })
      });
      setTimeout(function(){res.redirect('/user/profile');}, 500);
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
    res.redirect('/trips/view/' + req.params.id + '#date-section')
  },


  AddUser: function(req, res){
    var email = req.body.companionEmails
    var tripId = req.params.id
    Trip.findOneAndUpdate({_id: tripId}, {$push: {companionEmails: email}}, function (err, trip) {
      if (err) { throw err}
      sendMail.companionEmailSend(email, trip.username)
    });
    res.redirect('/trips/view/' + req.params.id + '#companion-section')
  },

  //I added the AddFlights property below to push the flight information into a nested database but get the error message 'MongooseError [CastError]: Cast to ObjectId failed for value "undefined" at path "_id" for model "Trip"'

  AddFlights: function(req, res){
    var tripId = req.params.id;
    var flight = req.body
    Trip.findOneAndUpdate({_id: tripId}, {$push: {flights: flight}}, function (err) {
      if (err) { throw err}
    });
    setTimeout(function(){res.redirect('/trips/view/' + req.params.id + '#flights-section')}, 500);
  },

  DeleteFlight: function(req,res){
    var tripId = req.params.id;
    var flightIndex = req.params.index;
    Trip.findOne({_id: tripId}, function(err, trip){
      if (err) { throw err}
      trip.flights.splice(flightIndex, 1)
        trip.save(function(err){
          if(err) {throw err}
      });
    });
    setTimeout(function(){res.redirect('/trips/view/' + req.params.id + '#flights-section')}, 500);
  },

  AddAccommodation: function(req, res){
    var tripId = req.params.id;
    var accommodation = req.body
    Trip.findOneAndUpdate({_id: tripId}, {$push: {accommodations: accommodation}}, function (err) {
      if (err) { throw err}
    });
  setTimeout(function(){res.redirect('/trips/view/' + req.params.id + '#accommodation-section')}, 500);
  },

  DeleteAccommodation: function(req,res){
    var tripId = req.params.id;
    var accommodationIndex = req.params.index;
    Trip.findOne({_id: tripId}, function(err, trip){
      if (err) { throw err}
      trip.accommodations.splice(accommodationIndex, 1)
      trip.save(function(err){
          if(err) {throw err}
      });
    });
  setTimeout(function(){res.redirect('/trips/view/' + req.params.id + '#accommodation-section')}, 500);
  },

  Chat: function(req, res) {
    var tripId = req.params.id;
    var username = req.cookies.CurrentUser
    var message = {author: username, message: req.body.chatMessages}
    Trip.findOne({_id: tripId}, function(err, trip){
      trip.chatMessages.push(message)
      trip.save(function(err){
        if (err) { throw err}
      })
    })
    setTimeout(function(){res.redirect('/trips/view/' + req.params.id + '#message-section')}, 500);
  },



  ViewActivities: function(req, res) {
    var username = req.cookies.CurrentUser
    var tripId = req.params.id
    Trip.findOne({_id: tripId}, function(err, trip){
      if (err) { throw err}
      var dates = getDates.getDates(trip.startDate, trip.endDate)
      res.render('trips/itinerary', {trip: trip, dates: dates, username: username})
    })
  },

  AddActivity: function(req, res) {
    var tripId = req.params.id;
    var newActivity = req.body.activity;
    var eachDate = req.body.eachDate;
    var query = {eachDate: eachDate ,activities: newActivity}
    Trip.findOneAndUpdate({_id: tripId}, {$push: {activities: query}}, function (err, activity) {
      if (err) { throw err}
      });
      setTimeout(function(){res.redirect('/trips/itinerary/' + req.params.id)}, 500);
  },

//The DeleteActivity function is passing the activityIndex but not the tripId into the URL for some reason!!! 21/4/20
  DeleteActivity: function(req, res){
    var tripId = req.params.id;
    var newActivity = req.body.activity;
    var eachDate = req.body.eachDate;
  
    Trip.findOne({_id: tripId}, function(err, trip){
      if (err) {throw err}
    var activityIndex  =  trip.activities.findIndex(obj => obj.activities === newActivity && obj.eachDate === eachDate);
    console.log(activityIndex)
      trip.activities.splice(activityIndex, 1)
      trip.save(function(err){
        if(err) {throw err}
      });
    });
     setTimeout(function(){res.redirect('/trips/itinerary/' + req.params.id)}, 500);
  }


 };

module.exports = TripsController;
