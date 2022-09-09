const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.post("/like", PostsController.Like);
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);


module.exports = router;
