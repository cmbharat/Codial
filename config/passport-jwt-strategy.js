const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;
const User = require("../models/user");

let opts = {
  jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codeial",
};

//authentication using passport
passport.use(
  new JwtStrategy(opts, function (jwtPayload, done) {
    //find a user and establish the  identity
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        console.log("error in finding user in jwt");
        return done(err);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
