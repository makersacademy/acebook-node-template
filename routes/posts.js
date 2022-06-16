const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/update", PostsController.Update);
router.post("/like", PostsController.Like);
router.post("/remove", PostsController.Delete);

module.exports = router;
