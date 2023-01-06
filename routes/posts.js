const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);

//please work - 
router.post('/:id/act', PostsController.Like);
router.post('/:id/love', PostsController.Love);

module.exports = router;
