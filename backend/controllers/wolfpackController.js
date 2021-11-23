import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import WolfPack from "../models/wolfpackModel.js";
import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/mailer.js";


const paymentOption = asyncHandler(async (req, res) => {
  let { amount, orderId } = req.body;
  var amountValue = Math.floor(amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amountValue,
      currency: "USD",
      description: "Your Company Description",
      payment_method: orderId,
      confirm: true
    });
    res.json({
      data: payment,
      message: "Payment Successful",
      success: true
    });
  } catch (error) {
    res.json({
      message: "Payment Failed",
      value: error,
      success: false
    });
  }
});

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    billingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    deliveryInstruction,
    transactionId,
    last4,
    giftMessage
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new WolfPack({
      orderItems,
      user: req.user ? req.user?._id : req.body.userId,
      shippingAddress,
      billingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      deliveryInstruction,
      transactionId,
      last4,
      giftMessage,
      
      isPaid: true
    });

    const createdOrder = await order.save();

    const user = await User.findById(
      req.user ? req.user?._id : req.body.userId
    );
    orderItems?.map(async data => {
      const product = await Product.findById(data.product);
      if (product) {
        product.countInStock = product.countInStock - 1;
        product.orders = product.orders + 1;
        const updatedProduct = await product.save();
      }
    });
    const __dirname = path.resolve();
    // ejs.renderFile(
    //   __dirname + "/backend/views/BOOMBOLTmail.ejs",
    //   { datavalue: order },
    //   function (err, val) {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       var maillist = ["info@BOOMBOLTtechnology.com", user.email];
    //       let transporter = nodemailer.createTransport({
    //         host: "smtp.office365.com",
    //         secure: false,
    //         requireTLS: true,
    //         auth: {
    //           user: "info@BOOMBOLTtechnology.com",
    //           pass: "Setup@123"
    //         },
    //         tls: {
    //           ciphers: "SSLv3"
    //         }
    //       });

    //       const __dirname = path.resolve();

          createdOrder.orderItems.map((dataValue, key) => {
            var order_item = [];
            order_item.push(createdOrder.orderItems[key]);
            const orderData = new Order({
              orderItems: order_item,
              user: req.user ? req.user?._id : req.body.userId,
              shippingAddress,
              paymentMethod,
              itemsPrice,
              taxPrice,
              shippingPrice,
              totalPrice,
              deliveryInstruction,
              transactionId,
              last4,
              isPaid: true,
              orderId: createdOrder._id,
              BOOMBOLTOrderId: createdOrder.BOOMBOLTOrderId
            });

            // ejs.renderFile(
            //   path.join(__dirname, "./backend/views/", "report.ejs"),
            //   { datavalue: orderData },
            //   (err, data) => {
            //     if (err) {
            //       res.send(err);
            //     } else {
            //       let options = {
            //         height: "842px",
            //         width: "595px"
            //       };
            //       var user_name = dataValue.countInStock;
            //       htmlPdf
            //         .create(data, options)
            //         .toFile(
            //           Math.floor(Math.random() * 9999999 + 1).toString() +
            //           ".pdf",
            //           function (err, data) {
            //             if (err) {
            //               res.send(err);
            //             } else {
            //               var pdf_data = {
            //                 filename:
            //                   Math.floor(
            //                     Math.random() * 9999999 + 1
            //                   ).toString() + ".pdf",
            //                 path: data.filename,
            //                 contentType: "application/pdf"
            //               };
            //               pdfarray.push(pdf_data);
                          if (orderItems.length == key + 1) {
                            // let info = transporter.sendMail({
                            //   from: '"Support " <info@BOOMBOLTtechnology.com>',
                            //   to: maillist,
                            //   subject: "Your order has been placed.",
                            //   text: "Order Successfully Booked;",
                            //   html: val,
                            //   attachments: pdfarray
                            // });
                            let mailObj={
                              email:user.email,
                              subject:"Your order has been placed.",
                              text:"your order for wolfpack subscription is successfully done.."
                            }
                            let template={datavalue:order}
                            sendMail(template,mailObj)

                          }
                        // }
                      // }
                    // );
                // }
              // }
            // );
          });
          // pdfarray = [];
        // }
      // }
    // );
    res.status(201).json(createdOrder);
  }
});


const wolfpackOrder = asyncHandler(async (req, res) => {
  const wolfpackorders = await WolfPack.find({ user: req.user._id }).sort({
    createdAt: -1
  });
  res.json(wolfpackorders);
});

export { paymentOption, addOrderItems, wolfpackOrder }