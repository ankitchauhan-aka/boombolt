import asyncHandler from "express-async-handler";
import RequestQuoteMessage from "../models/quoteModel.js";
import nodemailer from "nodemailer";
import cloudinary from "cloudinary";
import ejs from "ejs";
import path from "path";

const RequestQuote = async (req, res) => {
  const { name, email, subject, message, image } = req.body;

  try {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    let uploadeResponse = await cloudinary.v2.uploader.upload(req.body.image, {
      resource_type: "auto",
    });
    const imagedata = uploadeResponse.secure_url;
    console.log;

    const quote = await RequestQuoteMessage.create({
      name,
      email,
      subject,
      message,
      imagedata,
    });
    if (quote) {
      const __dirname = path.resolve();

      ejs.renderFile(
        __dirname + "/backend/views/contactmail.ejs",
        function (err, val) {
          if (err) {
            console.log(err);
          } else {
            var maillist = [quote.email];
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
                    subject: "Thank You for contacting BOOMBOLT Technology.",
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
        { datavalue: quote },
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
              { datavalue: quote },
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
                    subject: "Thank You for contacting BOOMBOLT Technology.",
                    html: val,
                    attachments: [
                      {
                        path: req.body.image,
                      },
                    ],
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
  } catch (err) {
    console.log(err);
  }
};
export { RequestQuote };
