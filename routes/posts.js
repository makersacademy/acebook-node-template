const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/new", PostsController.New);
router.post("/update", PostsController.Update);
router.post("/remove", PostsController.Delete);

module.exports = router;
