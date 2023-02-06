const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("new comment mailer", comment);

  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );
  nodeMailer.transporter.sendMail(
    {
      from: "bharatc.10@gmail.com",
      to: comment.user.email,
      subject: "new comment added",
      html: htmlString,
    },
    (error, info) => {
      if (error) {
        console.log("eror in sending email", error);
        return;
      }
      console.log("mail delivered", info);
      return;
    }
  );
};
