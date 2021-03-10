var express = require('express');
var router = express.Router();

var LoginController = require('../controllers/login')

router.get('/', LoginController.Index);
router.post('/', LoginController.Dashboard);

module.exports = router;

