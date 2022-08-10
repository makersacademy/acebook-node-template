const express = require("express");
// express is just a library we use, web framework 
// which allows you to run functions
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
// calling method on the post controls, getting info
router.post("/", PostsController.Create);
// calling method to give info to the server
router.get("/new", PostsController.New);
//  displaying posts which is in the view folder
module.exports = router;


// so essentially passing in whatever the user types ionto the logic in controller
