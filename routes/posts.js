const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/delete/:id", PostsController.Delete);
router.post("/likes/:id", PostsController.Like);
router.post("/comments/:id", CommentsController.Create);
router.get("/viewlikes/:id", PostsController.viewLikeReact);

module.exports = router;
