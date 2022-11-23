module.exports.profile = function (req, res) {
  // res.end("<h1>profile module</h1>");
  return res.render("profile", {
    title: "Profile",
  });
};
