var express = require('express');
var router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

var PostsController = require('../controllers/posts')

router.get('/', PostsController.Index);
router.post('/', upload.array('image'), PostsController.Create);
router.get('/new', PostsController.New);
router.post('/:id/delete', PostsController.Delete);
router.get('/sorted', PostsController.Sort);
router.get('/:id/edit', PostsController.EditPage);
router.post('/edit/:id', PostsController.Edit);
router.get('/search', PostsController.Search);

module.exports = router;
