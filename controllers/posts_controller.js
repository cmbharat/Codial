const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/like");
module.exports.create = async function (req, res) {
  // Post.create(
  //   {
  //     content: req.body.content,
  //     user: req.user._id,
  //   },
  //   function (err, post) {
  //     if (err) {
  //       console.log("error" + err);
  //       return;
  //     }
  //     return res.redirect("back");
  //   }
  // );

  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

    if (req.xhr) {
      //req.xhr is used to check if its ajax request
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post Created",
      });
    }
    req.flash("success", "post published");
    return res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      await Like.deleteMany({ likeable: post, onModel: "Post" });
      await Like.deleteMany({ _id: { $in: post.comments } });

      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      if (req.xhr) {
        return res.status(200).json({
          data: { post_id: req.params.id },
          message: "posts deleted successfully",
        });
      }

      req.flash("success", "Post and associated comments deleted");
      return res.redirect("back");
    } else {
      req.flash("error", "you cannot delete this post");
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return res.redirect("back");
  }
};
