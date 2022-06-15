const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/create_comment", PostsController.CreateComment);
router.post("/add_like", PostsController.AddLike);

module.exports = router;
