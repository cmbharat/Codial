const Post = require("../models/post");
const User = require("../models/user");

// module.exports.home = function (req, res) {
//   // return res.end("<h1>Express is up for codial</h1>");
//   // console.log(req.cookies);
//   // res.cookie("user_id", 25);

//   // Post.find({}, function (err, posts) {
//   //   return res.render("home", {
//   //     title: "Codial | Home",
//   //     posts: posts,
//   //   });
//   // });

//   //populate the user of each post

//   Post.find({})
//     .populate("user")
//     .populate({
//       path: "comments",
//       populate: {
//         path: "user",
//       },
//     })
//     .exec(function (err, posts) {
//       if (err) {
//         console.log("error in find " + err);
//         return;
//       }
//       User.find({}, function (err, users) {
//         return res.render("home", {
//           title: "Codial | Home",
//           posts: posts,
//           all_users: users,
//         });
//       });
//       // console.log("no error  in find method");
//     });
// };

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort("-createdAt")
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});
    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (error) {
    console.log("Error in hc" + error);
  }
};

//get all the users
