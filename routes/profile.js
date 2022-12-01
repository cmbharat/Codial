const express = require("express");

const router = express.Router();
const profileController = require("../controllers/profile_controller");

router.get("/profile", profileController.profile);
router.get("/signup", profileController.signUp);
router.get("/signin", profileController.signIn);
router.post("/create", profileController.create);
router.post("/create-session", profileController.createSession);
router.get("/signout", profileController.signout);
module.exports = router;
