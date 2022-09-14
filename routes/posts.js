const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");
const upload = require("../middleware/multer")

router.post("/like", PostsController.Like);
router.get("/", PostsController.Index);
router.post("/", upload.single('image'), PostsController.Create);

module.exports = router;
