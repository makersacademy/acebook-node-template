var express = require('express');
var router = express.Router();

<<<<<<< HEAD
var SignupController = require('../controllers/signup')

router.get('/', SignupController.Index);

module.exports = router;

=======
var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);

module.exports = router;
>>>>>>> 8f47b83b4b1c8a263d1297d7738e2a255aefaf4b
