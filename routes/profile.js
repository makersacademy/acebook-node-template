var express = require('express');
var router = express.Router();

var ProfileController = require('../controllers/profile')

router.get('/', ProfileController.Index);
router.post('/', ProfileController.Create);


module.exports = router;
