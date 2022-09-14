const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer")
const upload2 = require("../middleware/multer2")

const PostsController = require("../controllers/posts");

router.post("/upload", upload.single('image'), PostsController.Upload);
router.post("/like", PostsController.Like);
router.get("/", PostsController.Index);
router.post("/", upload2.single('image'), PostsController.Create);

module.exports = router;
