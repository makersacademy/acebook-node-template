var express = require('express');
var router = express.Router();
const multer = require('multer');
var PostsController = require('../controllers/posts')

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname);
  }
});
const upload = multer({ storage: fileStorageEngine });

router.get('/', PostsController.Index);
router.post('/', upload.single("post-picture"), PostsController.Create);
router.post('/comment/new', PostsController.NewComment);
router.post('/:id/likes', PostsController.CountLikes);

module.exports = router;
