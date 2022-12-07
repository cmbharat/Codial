const express = require("express");
const passport = require("passport");
const router = express.Router();
const profileController = require("../controllers/profile_controller");

router.get("/profile", passport.checkAuthentication, profileController.profile);
router.get("/signup", profileController.signUp);
router.get("/signin", profileController.signIn);

router.post("/create", profileController.create);

router.get("/signout", profileController.destroySession);
//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  profileController.createSession
);
module.exports = router;
