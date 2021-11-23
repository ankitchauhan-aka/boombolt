import asyncHandler from "express-async-handler";
import ContactUs from "../models/contactusModel.js";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const Contactus = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contact = await ContactUs.create({
    name,
    email,
    subject,
    message,
  });
  if (contact) {
    const __dirname = path.resolve();

    ejs.renderFile(
      __dirname + "/backend/views/contactmail.ejs",

      function (err, val) {
        if (err) {
          console.log(err);
        } else {
          var maillist = [contact.email];
          let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            secure: false,
            requireTLS: true,
            auth: {
              user: "info@BOOMBOLTtechnology.com",
              pass: "Setup@123",
            },
            tls: {
              ciphers: "SSLv3",
            },
          });

          const __dirname = path.resolve();

          ejs.renderFile(
            path.join(__dirname, "./backend/views/", "contactmail.ejs"),
            (err, data) => {
              if (err) {
                res.send(err);
              } else {
                let options = {
                  height: "842px",
                  width: "595px",
                };
                let info = transporter.sendMail({
                  from: '"Support " <info@BOOMBOLTtechnology.com>',
                  to: maillist,
                  subject: "Thank You for contacting Boombolt.",
                  // text: "Order Successfully Booked;",
                  html: val,
                });
              }
            }
          );
        }
      }
    );
    ejs.renderFile(
      __dirname + "/backend/views/contactmailInfo.ejs",
      { datavalue: contact },
      function (err, val) {
        if (err) {
          console.log(err);
        } else {
          var maillist = ["info@BOOMBOLTtechnology.com"];
          let transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            secure: false,
            requireTLS: true,
            auth: {
              user: "info@BOOMBOLTtechnology.com",
              pass: "Setup@123",
            },
            tls: {
              ciphers: "SSLv3",
            },
          });

          const __dirname = path.resolve();

          ejs.renderFile(
            path.join(__dirname, "./backend/views/", "contactmailInfo.ejs"),
            { datavalue: contact },
            (err, data) => {
              if (err) {
                res.send(err);
              } else {
                let options = {
                  height: "842px",
                  width: "595px",
                };
                let info = transporter.sendMail({
                  from: '"Support " <info@BOOMBOLTtechnology.com>',
                  to: maillist,
                  subject: "Thank You for contacting Boombolt.",
                  html: val,
                });
              }
            }
          );
        }
      }
    );

    res.status(201).json("message saved");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export { Contactus };
