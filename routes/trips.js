var express = require('express');
var router = express.Router();

var TripsController = require('../controllers/trips');


router.get('/new', TripsController.New);
router.post('/new', TripsController.Create);
router.post('/delete/:id', TripsController.Delete);
router.get('/view/:id', TripsController.View);
router.post('/edit-data/:id', TripsController.EditData);
router.post('/add-user/:id', TripsController.AddUser);
router.post('/save-edits/:id', TripsController.SaveEdits);
router.post('/edit/:id', TripsController.Edit);
router.post('/add-flight/:id', TripsController.AddFlights);
router.post('/add-accommodation/:id', TripsController.AddAccommodation);

module.exports = router;
