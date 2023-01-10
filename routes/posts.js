const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
//const { route } = require("./home");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);

router.post('/:id/act', PostsController.Like);
router.post('/:id/love', PostsController.Love);

//add a friend to follow
router.post('/:id/befriend', PostsController.Follow);

module.exports = router;
