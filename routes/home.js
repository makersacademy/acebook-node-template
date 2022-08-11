const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/home");

router.get("/", HomeController.Index);
router.get("/", HomeController.Login);


module.exports = router;


// looks at the logic in the controller and tells it to perform
// desired logic in specified pathway
