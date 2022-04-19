const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.put("/update/comment", PostsController.UpdateComment);
router.put("/update/like", PostsController.UpdateLikes);


module.exports = router;
