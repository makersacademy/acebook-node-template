const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const upload = require("../middleware/multer").upload
const errorHandler = require("../middleware/multer").fileSizeLimitErrorHandler

router.post("/like", PostsController.Like);
// router.post("/comment", PostsController.Comment);
router.get("/", PostsController.Index);
router.post("/", upload.single('image'), errorHandler, PostsController.Create);

module.exports = router;
