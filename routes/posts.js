const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id/comment", PostsController.Comment);
router.get("/new", PostsController.New);


module.exports = router;
