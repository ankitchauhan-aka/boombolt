import express from "express";

const router = express.Router();

import {
  authAdmin,
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  reAuthUser,
  addAddress,
  addWhishlist,
  getUserWishList,
  removeUserWishList,
  removeAddress,
  defaultAddress,
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
} from "../controllers/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(getUsers);
router.route("/otp").post(sendOtp);
router.route("/resetpassword").post(resetPassword);
router.route("/verifyuser").post(verifyUser);
router.route("/forgotpassword").post(forgetPassword).put(updateNewPassword);
router.post("/login", authUser);

router.route("/removeAddress/:userId/:addressId").delete(removeAddress);
router.route("/defaultAddress/:userId/:addressId").put(defaultAddress);

router
  .route("/removeBillingAddress/:userId/:addressId")
  .delete(removeBillingAddress);

router
  .route("/defaultBillingAddress/:userId/:addressId")
  .put(defaultBillingAddress);
router
  .route("/updateBillingAddress/:userId/:addressId")
  .post(updateBillingAddress);

router.post("/admin_login", authAdmin);

router.route("/access-token").get(protect, reAuthUser);
router.route("/addWhishlist").post(addWhishlist);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/wish/:userId").get(getUserWishList);
router.route("/wish/:userId/:productId").delete(removeUserWishList);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(getUserById)
  .put(updateUser);

router.route("/address").post(addAddress);
router.route("/updateAddress/:userId/:addressId").post(updateAddress);

router.route("/billlingaddress").post(addBillingAddress);

export default router;
