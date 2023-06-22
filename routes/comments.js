const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");

router.post("/", CommentsController.Create);
// router.get("/:id/editcomment", CommentsController.Edit);

// router.post("/:id/update", CommentsController.Update);
router.post("/:id/delete", CommentsController.Delete);

module.exports = router;
