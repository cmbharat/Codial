const Post = require("../models/post");

module.exports.home = function (req, res) {
  // return res.end("<h1>Express is up for codial</h1>");
  // console.log(req.cookies);
  // res.cookie("user_id", 25);

  // Post.find({}, function (err, posts) {
  //   return res.render("home", {
  //     title: "Codial | Home",
  //     posts: posts,
  //   });
  // });

  //populate the user of each post

  Post.find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec(function (err, posts) {
      if (err) {
        console.log("error in find " + err);
        return;
      }
      console.log("no error  in find method");
      return res.render("home", {
        title: "Codial | Home",
        posts: posts,
      });
    });
};
