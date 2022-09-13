const express = require("express");
const router = express.Router();

const multer = require('multer')
const upload = multer({
  limits: {
    filesize: 4 * 1024 * 1024,
  }
})

const PostsController = require("../controllers/posts");

router.post("/upload", upload.single('image'), PostsController.Upload);
router.post("/like", PostsController.Like);
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);

module.exports = router;
