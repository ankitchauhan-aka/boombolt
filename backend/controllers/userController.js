import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import nodemailer from "nodemailer";
import fs from "fs";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import sendMail from "../utils/mailer.js";


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i"
        }
      }
    : {};

  const user = await User.findOne(mail);
  if (user) {
    if (user && (await user.matchPassword(password)) && user.isAdmin == false) {
      if (user.isVerified) {
        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          addresses: user.addresses,
          billingaddresses: user.billingaddresses,
          communicationPref:user.communicationPref,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          token: generateToken(user._id)
        });
      } else {
        res.status(200).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          addresses: user.addresses,
          billingaddresses: user.billingaddresses,
          communicationPref:user.communicationPref,
          isAdmin: user.isAdmin,
          isVerified: user.isVerified,
          token: generateToken(user._id)
        });
      }
    }
    else{
      res.json("User Not Verified");
    }
  } else {
    res.status(401).json("Invalid email or password");
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i"
        }
      }
    : {};

  const admin = await User.findOne({ ...mail });
  if (admin && (await admin.matchPassword(password)) && admin.isAdmin == true) {
    res.json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      phone: admin.phone,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const reAuthUser = asyncHandler(async (req, res) => {
  const user = req.user; //await User.findOne({ email })

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  const isVerified = false;
  const userExists = await User.findOne({ email });
  const otp = Math.random().toString(36).substring(2, 8).toUpperCase();


  if (userExists) {
    if (!userExists.is_verified) {
      userExists.otp = otp;
      // let file = "/backend/views/resendOtpMailTemplate.ejs";
      let template = { user: userExists, otp: otp };
      let mailObj = {
        email: userExists.email,
        subject: "Otp for user verification .",
      };
      sendMail("/backend/views/resendOtpMailTemplate.ejs", template, mailObj);

      await userExists.save();
      res.json("user is not verified");
    } else {
      res.json("User already exists");
    }
  }

  const user = await User.create({
    firstName,
    lastName,
    phone,
    email,
    password,
    otp,
    isVerified
  });
  if (user) {
    // let file = "/backend/views/verificationMailTemplate.ejs";
    let template = { user: user, otp: otp };
    let mailObj = { email: user.email, subject: "Otp for user verification ." };
    sendMail("/backend/views/verificationMailTemplate.ejs", template, mailObj);
    res.status(201).json("success");
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};
// reset password.........//

const resetPassword = asyncHandler(async (req, res) => {
  const { email, password, otp } = req.body;
  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i"
        }
      }
    : {};
  const user = await User.findOne({ ...mail });
  if (user) {
    if (user.otp == otp) {
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
        addresses: updatedUser.addresses,
        isAdmin: updatedUser.isAdmin,
        isVerified: updatedUser.isVerified
        // token: generateToken(updatedUser._id),
      });
    } else {
      res.json("Wrong otp");
    }
  } else {
    res.status(404);
    throw new Error("Wrong Current Password.");
  }
});

// verify User after signup......

const verifyUser = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i"
        }
      }
    : {};
  const user = await User.findOne(mail);

  if (user) {
    if (user.otp == otp) {
      user.firstName = user.firstName;
      user.lastName = user.lastName;
      user.phone = user.phone;
      user.email = user.email;
      user.password = user.password;
      user.isVerified = true;
      user.otp = user.otp;
      const updatedUser = await user.save();
      res.json({
        _id: user._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isVerified: updatedUser.isVerified,
        token: generateToken(updatedUser._id)
      });
      // let file = "/backend/views/registrationConfirmationMail.ejs";
      let mailObj = {
        email: userExists.email,
        subject: "Registered with Boombolt.",
      };
      sendMail("/backend/views/registrationConfirmationMail.ejs", mailObj);
    } else {
      res.json("Wrong otp");
    }
  } else {
    res.status(404);
    throw new Error("Wrong Current Password.");
  }
});

// ================================forgot password=============================================//

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // var OTP = Math.floor(100000 + Math.random() * 900000);
  const OTP = Math.random().toString(36).substring(2, 8).toUpperCase();

  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i"
        }
      }
    : {};
  const user = await User.findOne(mail);
  if (user) {
    // let file = "/backend/views/forgetPasswordOtp.ejs";
    let template = { user: user, otp: OTP };
    let mailObj = { email: user.email, subject: "Otp for forget Password." };
    sendMail("/backend/views/forgetPasswordOtp.ejs", template, mailObj);
    res.status(201).json("success");
    let id1 = user._id;
    User.updateOne(
      { _id: id1 },
      {
        $set: {
          otp: OTP
        }
      },
      function(err, doc) {
        if (err) throw err;
      }
    );
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const updateNewPassword = asyncHandler(async (req, res) => {
  const { email, otp, password } = req.body;
  const Password = req.body.password;
  const mail = req.body.email
    ? {
        email: {
          $regex: req.body.email,
          $options: "i"
        }
      }
    : {};
  const user = await User.findOne({ ...mail });
  if (user) {
    if (user.otp == otp) {
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
        addresses: updatedUser.addresses,
        isAdmin: updatedUser.isAdmin,
        isVerified: updatedUser.isVerified
      });
    } else {
      res.status(404);
      throw new Error("Otp not matched");
    }
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

// ============ forget password =====================

const sendOtp = asyncHandler(async (email, res) => {
  // const email = req.body ? req.body.email : "";
  const mail = email
    ? {
        email: {
          $regex: email,
          $options: "i"
        }
      }
    : {};
  const userExists = await User.findOne({ ...mail });
  if (userExists) {
    var otp = Math.floor(100000 + Math.random() * 900000);
    let transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.office365.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: "info@BOOMBOLTtechnology.com",
        pass: "Setup@123"
      },
      tls: {
        ciphers: "SSLv3"
      }
    });
    let info = transporter.sendMail({
      from: '"Support " <trivedianiket98@gmail.com>',
      to: userExists.email,
      subject: "You are registerd with BoomBolt",
      text: "Your otp is " + otp
    });
    userExists.otp = otp;
    const updatedUser = await userExists.save();
    // res.json("otp send");
  } else {
    res.json("user not exist");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      communicationPref: updatedUser.communicationPref,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user && (await user.matchPassword(req.body.oldPassword))) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      email: updatedUser.email,
      addresses: updatedUser.addresses,
      isAdmin: updatedUser.isAdmin,
      communicationPref: updatedUser.communicationPref,
      token: generateToken(updatedUser._id)
    });
  } else {
    res.status(404);
    throw new Error("Wrong Current Password.");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id).select("-password");
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.phone = req.body.phone || user.phone;
    user.email = req.body.email || user.email;
    user.file = req.body.file || user.file;
    // user.isAdmin = req.body.isAdmin;
    // if (req.body.prefData)
    const data = await Promise.all([req.body.prefData]);
    user.communicationPref = data[0];

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      phone: updatedUser.phone,
      email: updatedUser.email,
      file: updatedUser.file,
      communicationPref: updatedUser.communicationPref
      // isAdmin: updatedUser.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const setDefaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: user._id });
  const addressIndex = user.addresses.findIndex(
    add => add._id === req.body.address_id
  );
  const defaultAddressIndex = user.addresses.findIndex(add => add.default);
  if (defaultAddressIndex) {
    user.addresses[defaultAddressIndex].default = false;
  }
  user.addresses[addressIndex].default = true;
  user.markModified("addresses");
  const savedUser = await user.save();
  if (savedUser) {
    res.status(201).json(savedUser);
  } else {
    res.status(404);
    throw new Error("Address not Saved");
  }
});

const addAddress = asyncHandler(async (req, res) => {
  var savedUser = "";
  const {
    firstname,
    lastname,
    phone,
    email,
    city,
    state,
    postalCode,
    streetaddress,
    country,
    userId
  } = req.body;
  if (userId) {
    const user = await User.findOne({ _id: userId });
    if (user) {
      user.addresses.push({
        firstname,
        lastname,
        phone,
        email,
        city,
        state,
        postalCode,
        streetaddress,
        country
      });
      user.markModified("addresses");
      savedUser = await user.save();
    }
  } else {
    const guestuser = await User.create({
      firstName: firstname,
      lastName: lastname,
      phone: phone,
      email: email
    });
    if (guestuser) {
      var userData = await User.findOne({ _id: guestuser._id });
      userData.addresses.push({
        firstname,
        lastname,
        phone,
        email,
        city,
        state,
        postalCode,
        streetaddress,
        country
      });
      userData.markModified("addresses");
      savedUser = await userData.save();
      savedUser.token = generateToken(userData._id);
    }
  }

  if (savedUser) {
    res.status(201).json(savedUser);
  } else {
    res.status(404);
    throw new Error("Address not Saved");
  }
});

const addBillingAddress = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    email,
    city,
    state,
    postalCode,
    streetaddress,
    country,
    userId
  } = req.body;

  const user = await User.findOne({ _id: userId });
  user.billingaddresses.push({
    firstname,
    lastname,
    phone,
    email,
    city,
    state,
    postalCode,
    streetaddress,
    country
  });
  user.markModified("billingaddresses");
  const savedUser = await user.save();
  if (savedUser) {
    res.status(201).json(savedUser);
  } else {
    res.status(404);
    throw new Error("Address not Saved");
  }
});

const addWhishlist = asyncHandler(async (req, res) => {
  const { userId, productId1 } = req.body;
  var updatedUser;
  const user = await User.findById(userId);
  if (user) {
    if (user.whishlist?.findIndex(prd => prd === productId1) > -1) {
      res.json("Already Added");
      updatedUser = "Already Added";
    } else {
      user.whishlist.push(productId1);
      var updated = await user.save();
      updatedUser = updated.whishlist;
    }
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserWishList = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (user) {
    const wishlist = [];
    for (let i = 0; i < user.whishlist.length; i++) {
      const product = await Product.findById(user.whishlist[i]);
      wishlist.push(product);
    }
    res.json(wishlist);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removeUserWishList = asyncHandler(async (req, res) => {
  const { userId, productId } = req.params;
  const user = await User.findById(userId);
  if (user) {
    const wishlists = user.whishlist.toObject();
    let index = wishlists.indexOf(productId);
    wishlists.splice(index, 1);
    user.whishlist = wishlists;
    await user.save();
    const wishlist = [];
    for (let i = 0; i < wishlists.length; i++) {
      const product = await Product.findById(wishlists[i]);
      wishlist.push(product);
    }
    res.json(wishlist);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Remove Address
// @route   PUT removeAddress/:id/:id

const removeAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const address = user.addresses;
    const user_address = [];
    address.map(data => {
      if (data._id != req.params.addressId) {
        user_address.push(data);
      }
    });
    user.addresses = user_address;
    await user.save();
    res.json(user_address);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const defaultAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const address = user.addresses;
    const user_address = [];
    address.map(data => {
      if (data._id == req.params.addressId) {
        data.defaultAddress = true;
        user_address.push(data);
      } else {
        data.defaultAddress = false;
        user_address.push(data);
      }
    });
    user.addresses = user_address;
    await user.save();
    res.json(user_address);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateBillingAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const billingAddress = user.billingaddresses;
    const user_billing_address = [];
    billingAddress.map(data => {
      if (data._id == req.params.addressId) {
        data.firstname = req.body.firstname;
        data.lastname = req.body.lastname;
        data.phone = req.body.phone;
        data.email = req.body.email;
        data.city = req.body.city;
        data.state = req.body.state;
        data.postalCode = req.body.postalCode;
        data.streetaddress = req.body.streetaddress;
        data.country = req.body.country;
        user_billing_address.push(data);
      } else {
        user_billing_address.push(data);
      }
    });
    user.addresses = user_billing_address;
    const savedUser = await user.save();
    res.json(savedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const address = user.addresses;
    const user_address = [];
    address.map(data => {
      if (data._id == req.params.addressId) {
        data.firstname = req.body.firstname;
        data.lastname = req.body.lastname;
        data.phone = req.body.phone;
        data.email = req.body.email;
        data.city = req.body.city;
        data.state = req.body.state;
        data.postalCode = req.body.postalCode;
        data.streetaddress = req.body.streetaddress;
        data.country = req.body.country;
        user_address.push(data);
      } else {
        user_address.push(data);
      }
    });
    user.addresses = user_address;
    const savedUser = await user.save();
    res.json(savedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const removeBillingAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const billingAddress = user.billingaddresses;
    const user_address = [];
    billingAddress.map(data => {
      if (data._id != req.params.addressId) {
        user_address.push(data);
      }
    });
    user.billingaddresses = user_address;
    await user.save();
    res.json(user_address);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const defaultBillingAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (user) {
    const billingaddress = user.billingaddresses;
    const user_billing_address = [];
    billingaddress.map(data => {
      if (data._id == req.params.addressId) {
        data.defaultAddress = true;
        user_billing_address.push(data);
      } else {
        data.defaultAddress = false;
        user_billing_address.push(data);
      }
    });
    user.addresses = user_billing_address;
    await user.save();
    res.json(user_billing_address);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authAdmin,
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  removeAddress,
  getUserById,
  updateUser,
  reAuthUser,
  addAddress,
  addWhishlist,
  setDefaultAddress,
  defaultAddress,
  getUserWishList,
  removeUserWishList,
  addBillingAddress,
  removeBillingAddress,
  defaultBillingAddress,
  updateAddress,
  updateBillingAddress,
  sendOtp,
  resetPassword,
  verifyUser,
  forgetPassword,
  updateNewPassword
};
