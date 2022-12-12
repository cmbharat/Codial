const User = require("../models/user");

module.exports.profile = function (req, res) {
  // res.end("<h1>profile module</h1>");
  return res.render("profile", {
    title: "User Profile",
  });
};
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("signup", {
    title: "Codial | signup",
  });
};
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("signin", {
    title: "Codial|signin",
  });
};

//get the signup data
module.exports.create = function (req, res) {
  //todo later
  console.log("inside create route");
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne(
    {
      email: req.body.email,
    },
    function (err, user) {
      if (err) {
        console.log("error in finding user in signing up");
        return;
      }
      if (!user) {
        User.create(req.body, function (err, user) {
          if (err) {
            console.log("error in creating user while signing up");
            return;
          }
          return res.redirect("/users/signin");
        });
      } else {
        return res.redirect("back");
      }
    }
  );
};

//get the signin and create session for user
module.exports.createSession = function (req, res) {
  // console.log("inside create session");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("error in logging out" + log);
      return;
    }
    return res.redirect("/");
  });
};
