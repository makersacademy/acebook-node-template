var express = require('express');
var router = express.Router();

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/:_id', PostsController.Create);
router.get('/new', PostsController.New);
router.delete('/:_id', PostsController.Delete); //added

module.exports = router;
