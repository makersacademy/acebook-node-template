var express = require('express');
var router = express.Router();

var SignupController = require('../controllers/signup')

router.get('/', SignupController.Index);
router.post('/', SignupController.Create);

module.exports = router;
