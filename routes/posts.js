const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/liked", PostsController.Like);
router.get("/edit/:id", PostsController.Edit);
router.post("/edit/:id", PostsController.SaveEdit);
router.post("/delete/:id", PostsController.Destroy);
router.get("/comment", PostsController.SinglePost);
router.post("/comment/:id/commented", PostsController.Comment);

module.exports = router;
