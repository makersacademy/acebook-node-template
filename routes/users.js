const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/:email", UsersController.Display);
router.get("/:email/edit", UsersController.Update);
router.post("/:email/edit", UsersController.UpdateDetails);

module.exports = router;
