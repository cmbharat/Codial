const express = require("express");

const router = express.Router();
const profileController = require("../controllers/profile_controller");

router.get("/profile", profileController.profile);
router.get("/signup", profileController.signUp);
router.get("/signin", profileController.signIn);
router.get("/create", profileController.create);
module.exports = router;
