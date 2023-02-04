const express = require("express");
const passport = require("passport");
const router = express.Router();
const userController = require("../controllers/users_controller");

router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);

router.post("/update/:id", passport.checkAuthentication, userController.update);
router.get("/signup", userController.signUp);
router.get("/signin", userController.signIn);
router.post("/create", userController.create);

//use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

router.get("/signout", userController.destroySession);

//route using which we send the data to google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

//route where we recieve the data from google
router.get(
  "/auth/google/callback",
  passport.authenticate(
    "google",
    { failureRedirect: "/users/signin" },
    userController.createSession
  )
);

module.exports = router;
