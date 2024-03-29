const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require("../../../config/environment");

//get the signin and create session for user
module.exports.createSession = async function (req, res) {
  try {
    // console.log(req);
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.status(422).json({ message: "Invalid Username or Password" });
    }

    return res.status(200).json({
      message: "signin successfull",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: "100000" }),
      },
    });
  } catch (error) {
    // console.log("*****", req.user.email, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
