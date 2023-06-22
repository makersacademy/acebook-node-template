const express = require("express");
const router = express.Router();
const { parser } = require("../services/cloudinaryService");
const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments");

router.get("/", PostsController.Index);
router.post("/", parser.single("image"), PostsController.Create);
router.get("/:id/edit", PostsController.Edit);
router.post("/:id/update", PostsController.Update);
router.post("/:id/delete", PostsController.Delete);

module.exports = router;
