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

  //I added the AddFlights property below to push the flight information into a nested database but get the error message 'MongooseError [CastError]: Cast to ObjectId failed for value "undefined" at path "_id" for model "Trip"'

  AddFlights: function(req, res){
    var tripId = req.params.id;
    var flightId = req.params.id2;
    // var dataKey = Object.keys(req.body)[0]
    // var newData = Object.values(req.body)[0]
    // const query = {}
    // query[dataKey] = newData
    //I think req.body on line 100 should be something else because it's being replaced with a whole long string.
    Trip.findOneAndUpdate({_id: tripId, 'flights._id': flightId}, {$push: {'flights._id': req.params.id2 }}, function (err) {
      if (err) { throw err}
    });
    // I need to add the flight id on line 102
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
