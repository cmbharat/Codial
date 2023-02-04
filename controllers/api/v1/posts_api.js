// const { create } = require("../../../models/post");
const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index = async function (req, res) {
  //   return res.json(200, {
  //     message: "List of posts",
  //     posts: [],
  //   });

  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.status(200).json({
    message: "List of posts",
    posts: posts,
  });
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      post.remove();

      await Comment.deleteMany({ post: req.params.id });

      return res
        .status(200)
        .json({ message: "Posts and its comments deleted" });
    } else {
      return res.json(401, { message: "you cannot delete this post" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "error in server" });
  }
};
