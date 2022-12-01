const user = require("../models/user");

module.exports.profile = function (req, res) {
  // res.end("<h1>profile module</h1>");

  if (req.cookies.user_id) {
    user.findById(req.cookies.user_id, function (err, users) {
      if (err) {
        console.log("error in finding cookie");
        return res.redirect("/users/signin");
      }

      if (users) {
        return res.render("profile", {
          title: "Profile",
          user: users,
        });
      } else {
        return res.redirect("/users/signin");
      }
    });
  } else {
    return res.redirect("/users/signin");
  }
};
module.exports.signUp = function (req, res) {
  return res.render("signup", {
    title: "Codial|signup",
  });
};
module.exports.signIn = function (req, res) {
  return res.render("signin", {
    title: "Codial|signin",
  });
};

//get the signup data
module.exports.create = function (req, res) {
  //todo later
  console.log(
    req.body +
      "   inside create----" +
      req.body.password +
      "  " +
      req.body.confirmPassword
  );
  if (req.body.password != req.body.confirmPassword) {
    console.log("password not matching");
    return res.redirect("back");
  }
  user.findOne(
    {
      email: req.body.email,
    },
    function (err, users) {
      if (err) {
        console.log("error in finding user in signing up");
        return;
      }
      if (!users) {
        console.log("inside create user since user not found");
        user.create(req.body, function (err, user) {
          if (err) {
            console.log("error in creating user while signing up");
            return;
          }
          return res.redirect("/users/signin");
        });
      } else {
        console.log("user found");
        return res.redirect("back");
      }
    }
  );
};

//get the signin and create session for user
module.exports.createSession = function (req, res) {
  //steps to authenticate
  //find the user
  console.log("inside create session");
  user.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing in ");
      return;
    }
    //handle user found
    if (user) {
      //handle password doesn't match
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      //handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      //handle user not found
      return res.redirect("back");
    }
  });
};

module.exports.signout = function (req, res) {
  console.log("inside signout function");
  res.clearCookie("user_id");
  return res.redirect("/users/signin");
};
