import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const sendMail = (file,template, mailObj ) => {
  try{
    const __dirname = path.resolve();
    ejs.renderFile(
      __dirname + file,
      {
        emailTemplate: template,
        appUrl: `${process.env.APP_URL}`
      },
      function (err, val) {
        if (err) {
          console.log(err);
        } else {
          let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            secure: false,
            requireTLS: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          transporter.sendMail({
            from: process.env.SUPPORT_EMAIL,
            to: mailObj.email,
            subject: mailObj.subject,
            html: val,
            attachments:mailObj.attachments,
          });
        }
      }
    );
  }catch(err){
    // res.status(500).json(err);
    console.log(err);
  }
}

export default sendMail;