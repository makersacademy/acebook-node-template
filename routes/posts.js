const express = require("express");
const router = express.Router();

const upload = require("../middleware/multer")

const PostsController = require("../controllers/posts");

router.post("/upload", upload.single('image'), PostsController.Upload);
router.post("/like", PostsController.Like);
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);

module.exports = router;
