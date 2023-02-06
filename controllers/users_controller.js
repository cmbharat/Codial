const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.params.id) {
  //   User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
  //     return res.redirect("back");
  //   });
  // } else {
  //   return res.status(401).send("unauthorized");
  // }
  if (req.user.id == req.params.id) {
    try {
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function (err) {
        console.log("inside update");
        if (err) {
          console.log("multer error", err);
        }
        user.name = req.body.name;
        user.email = req.body.email;
        console.log(req.file);
        if (req.file) {
          if (user.avatar) {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          }
          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
        return res.redirect("back");
      });
    } catch (err) {
      req.flash("error", err);
      return res.redirect("back");
    }
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("unauthorized");
  }
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
  // console.log("request------>", req);
  req.flash("success", "Logged in Successfully");
  // console.log("response------>", res);
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.flash("success", "Logged out Successfully");

  req.logout(function (err) {
    if (err) {
      console.log("error in logging out" + log);
      return;
    }
    return res.redirect("/");
  });
};
