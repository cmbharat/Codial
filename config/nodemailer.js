const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "bharatcm70@gmail.com",
    pass: "vyktrutkelzarqje",
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function (error, template) {
      if (error) {
        console.log("error in rendering template--------->", error);
        return;
      }
      mailHTML = template;
    }
  );
  return mailHTML;
};

module.exports = {
  renderTemplate: renderTemplate,
  transporter: transporter,
};
