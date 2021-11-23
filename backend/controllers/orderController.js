import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Stripe from "stripe";
import fs from "fs";
import ejs from "ejs";
import htmlPdf from "html-pdf";
import path from "path";
import Product from "../models/productModel.js";
import sendMail from "../utils/mailer.js";
import Razorpay from "razorpay";
import request from "request";

const createPayment = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.REACT_APP_RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET
    });
    const options = {
      amount: req.body.payable_amount * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0
    };
    razorpay.orders.create(options, async function(err, order) {
      if (err) {
        return res.status(500).json({
          message: "Something error!s"
        });
      }
      return res.status(200).json(order);
    });
  } catch (error) {
    console.log(error);
    // res.status(404).send(error);
  }
};

const completePayment = async (req, res) => {
  var payable_amount = req.query.payable_amount;
  try {
    return request(
      {
        method: "POST",
        url: `https://${process.env.REACT_APP_RAZORPAY_KEY}:${process.env.RAZORPAY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: payable_amount * 100,
          currency: "INR"
        }
      },
      async function(err, response, body) {
        if (err) {
          return res.status(500).json({
            message: err.message
          });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
    // console.log(err)
  }
};

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);
var pdfarray = [];
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  console.log(req.body, "req.body.....////");
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
    giftMessage,
    payment_id,
    success
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
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
      payment_id,
      success,
      isPaid: true
    });

    const createdOrder = await order.save();

    console.log(order, createdOrder, "order created...");

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
        payment_id,
        success,
        isPaid: true,
        orderId: createdOrder._id,

        BOOMBOLTOrderId: createdOrder.BOOMBOLTOrderId
      });

      ejs.renderFile(
        path.join(__dirname, "./backend/views/", "report.ejs"),
        { datavalue: orderData },
        (err, data) => {
          if (err) {
            res.send(err);
          } else {
            let options = {
              height: "842px",
              width: "595px"
            };
            var user_name = dataValue.countInStock;
            htmlPdf
              .create(data, options)
              .toFile(
                Math.floor(Math.random() * 9999999 + 1).toString() + ".pdf",
                function(err, data) {
                  if (err) {
                    res.send(err);
                  } else {
                    var pdf_data = {
                      filename:
                        Math.floor(Math.random() * 9999999 + 1).toString() +
                        ".pdf",
                      path: data.filename,
                      contentType: "application/pdf"
                    };
                    pdfarray.push(pdf_data);
                    if (orderItems.length == key + 1) {
                      // let file = "/backend/views/BOOMBOLTmail.ejs";
                      let template = { datavalue: order };
                      let mailObj = {
                        email: user.email,
                        subject: "Your order has been placed.",
                        attachments: pdfarray
                      };
                      sendMail(
                        "/backend/views/BOOMBOLTmail.ejs",
                        template,
                        mailObj
                      );
                    }
                  }
                }
              );
          }
        }
      );
    });
    pdfarray = [];
    // }
    // }
    // );
    res.status(201).json(createdOrder);
  }
});

const generatePdf = asyncHandler(async (req, res) => {
  const __dirname = path.resolve();

  req.orderItems.map((data, key) => {
    var order_item = [];
    order_item.push(req.orderItems[key]);
    const orderData = new Order({
      order_item: order_item,
      user: req.user,
      shippingAddress: req.shippingAddress,
      paymentMethod: req.paymentMethod,
      itemsPrice: req.itemsPrice,
      taxPrice: req.taxPrice,
      shippingPrice: req.shippingPrice,
      totalPrice: req.totalPrice,
      deliveryInstruction: req.deliveryInstruction,
      transactionId: req.transactionId,
      last4: req.last4,
      isPaid: true
    });
    ejs.renderFile(
      path.join(__dirname, "./backend/views/", "BOOMBOLTmail.ejs"),
      { data: orderData },
      (err, data) => {
        if (err) {
          res.send(err);
        } else {
          let options = {
            height: "842px",
            width: "595px"
          };
          htmlPdf
            .create(data, options)
            .toFile(req.user + ".pdf", function(err, data) {
              if (err) {
                res.send(err);
              } else {
                var pdf_data = {
                  filename: req.user + ".pdf",
                  path: data.filename,
                  contentType: "application/pdf"
                };
                pdfarray.push(pdf_data);
              }
            });
        }
      }
    );
  });
});

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

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc    Update order to shipment
// @route   GET /api/orders/:id/shipment
// @access  Private
const updateOrderToShipment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.order_id = req.body.order_id;
    order.shipment_id = req.body.shipment_id;
    order.awb_code = req.body.awb_code;
    order.courier_name = req.body.courier_name;
    order.label_url = req.body.label_url;
    order.manifest_url = req.body.manifest_url;
    order.pickup_scheduled_date = req.body.pickup_scheduled_date;
    order.pickup_token_number = req.body.pickup_token_number;
    order.routing_code = req.body.routing_code;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToReturn = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(order.user);
  const userEmail = user.email;
  if (order) {
    order.isReturned = true;
    order.returnReason = req.body.reason;
    const updatedOrder = await order.save();
    // res.json(updatedOrder);
    if (updatedOrder) {
      const user = order.user;
      const userEmail = await User.findById(user);
      if (userEmail) {
        const __dirname = path.resolve();
        // let file = "/backend/views/returnOrder.ejs";
        let template = { datavalue: order };
        let mailObj = {
          email: userEmail.email,
          subject: "Return order (Order ID:" + order._id + ")"
        };
        sendMail("/backend/views/returnOrder.ejs", template, mailObj);
      } else {
        res.status(404, "user not found");
        throw new Error("User not found");
      }
    }
  } else {
    res.status(404, "Order not found");
    throw new Error("Order not found");
  }
});

const updateOrderToCancelled = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const user = await User.findById(order.user);
  const userEmail = user.email;
  if (order) {
    order.isCancelled = true;
    order.cancelReason = req.body.reason;
    const updatedOrder = await order.save();
    // res.json(updatedOrder);
    if (updatedOrder) {
      const user = order.user;
      const userEmail = await User.findById(user);
      if (userEmail) {
        const __dirname = path.resolve();
        // ejs.renderFile(
        //   __dirname + "/backend/views/ordercancel.ejs",
        //   { datavalue: order },
        //   function (err, val) {
        //     if (err) {
        //     } else {
        //       var maillist2 = ["trivedianiket98@gmail.com", userEmail.email];
        //       let transporter = nodemailer.createTransport({
        //         host: "smtp.gmail.com",
        //         port: 465,
        //         auth: {
        //           user: "trivedianiket98@gmail.com",
        //           pass: "gm_password@123"
        //         },
        //         // tls: {
        //         //   ciphers: "SSLv3"
        //         // }
        //       });
        //       let info = transporter.sendMail({
        //         from: '"Support " <trivedianiket98.com>',
        //         to: maillist2,
        //         subject: "Your Order has been cancelled (Order ID:" + order._id + ")",
        //         text: "Your Order has been cancelled (Order ID:" + order._id + ") for amount " + order.totalPrice + ".",
        //         html: val
        //       });
        //   }
        // })

        // let file="/backend/views/ordercancel.ejs";
        let template = { datavalue: order };
        let mailObj = {
          email: userEmail.email,
          subject: "Your Order has been cancelled (Order ID:" + order._id + ")"
        };
        sendMail("/backend/views/ordercancel.ejs", template, mailObj);
      } else {
        res.status(404, "user not found");
        throw new Error("User not found");
      }
      res.json(updatedOrder);
    } else {
      res.status(400).json("order not canceled");
    }
  } else {
    res.status(404, "Order not found");
    throw new Error("Order not found");
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1
  });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  var datesort = 1;
  var pricesort = 1;

  if (req.query?.sort == "date") {
    datesort = -1;
  }
  if (req.query?.sort == "price") {
    pricesort = -1;
  }
  const pageSize = parseInt(req.query.rows) || 10;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword;
  const categoryQuery = req.query.category;
  let query = {};

  if (keyword != "all") {
    query = { $or: [] };
    query.$or.push({
      BOOMBOLTOrderId: {
        $regex: decodeURI(keyword),
        $options: "i"
      }
    });
    query.$or.push({ ManufPartNo: decodeURI(keyword) });
  }
  const allOrders = await Order.countDocuments(query);
  const count = allOrders;

  const orders = await Order.find(query)
    .sort({ createdAt: datesort })
    // .sort({ totalPrice: pricesort })
    .populate("user", "id firstName lastName email")
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  function compare(a, b) {
    if (a.totalPrice < b.totalPrice) {
      return -1;
    }
    if (a.totalPrice > b.totalPrice) {
      return 1;
    }
    return 0;
  }
  function compare1(a, b) {
    if (a.createdAt < b.createdAt) {
      return -1;
    }
    if (a.createdAt > b.createdAt) {
      return 1;
    }
    return 0;
  }
  if (req.query?.sort == "price") {
    orders.sort(compare1);
    orders.sort(compare);
  }
  res.json({
    orders,
    page,
    pages: Math.ceil(count / pageSize),
    count
  });
});

const generatePdfData = asyncHandler(async (req, res) => {
  const __dirname = path.resolve();
  let students = [
    { name: "Joy", email: "joy@example.com", city: "New York", country: "USA" },
    {
      name: "John",
      email: "John@example.com",
      city: "San Francisco",
      country: "USA"
    },
    {
      name: "Clark",
      email: "Clark@example.com",
      city: "Seattle",
      country: "USA"
    },
    {
      name: "Watson",
      email: "Watson@example.com",
      city: "Boston",
      country: "USA"
    },
    {
      name: "Tony",
      email: "Tony@example.com",
      city: "Los Angels",
      country: "USA"
    }
  ];

  ejs.renderFile(
    path.join(__dirname, "./backend/views/", "report.ejs"),
    {
      datavalue: {
        product: "6035590d5745963e90363256",
        name: "Atada Laptop",
        short_desc:
          "Our thinnest, lightest notebook, completely transformed by the Apple M1 chip. CPU speeds up to 3.5x faster. GPU speeds up to 5x faster. Our most advanced Neural Engine for up to 9x faster machine learning. The longest battery life ever in a MacBook Air. And a silent, fanless design. This much power has never been this ready to go.",
        image:
          "https://res.cloudinary.com/BOOMBOLTmedia/image/upload/v1614108944/c68jcsibfowzwni5ile8.jpg",
        discount_price: 99,
        shippingCharges: 50,
        tax: 20,
        price: 99,
        countInStock: 5,
        qty: 1
      }
    },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        let options = {
          height: "842px",
          width: "595px"
        };
        htmlPdf
          .create(data, options)
          .toFile("abc".toString() + ".pdf", function(err, data) {
            if (err) {
              res.send(err);
            } else {
            }
          });
      }
    }
  );
});

export {
  createPayment,
  completePayment,
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  updateOrderToCancelled,
  getMyOrders,
  getOrders,
  paymentOption,
  generatePdf,
  generatePdfData,
  updateOrderToReturn,
  updateOrderToShipment
};
