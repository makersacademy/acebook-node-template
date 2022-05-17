const express = require("express");
const multer  = require('multer')
const router = express.Router();

const upload = multer({ dest: 'uploads/' })

const UsersController = require("../controllers/users");

router.get("/new", UsersController.New);
router.post("/", UsersController.Create);
router.get("/:email", UsersController.Display);
router.get("/:email/edit", UsersController.Update);
router.post("/:email/edit", upload.single('image'), UsersController.UpdateDetails);

module.exports = router;
