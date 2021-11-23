import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  resetPasswordReducer,
  layoutReducer,
  userRegisterReducer,
  userLoginReducer,
  usersDetailsReducer,
  userUpdateReducer,
  categoryDetailsReducer,
  singleUserDetailsReducer,
  userUpdateProfileReducer,
  emailVerifyReducer,
  categoryReducer,
  bagsizeReducer,
  colorReducer,
  newdropReducer,
  materialReducer,
  orderCreateWolfpackReducer,
  orderPayWolfpackReducer,
  wolfpackOrderListMyReducer,
  forgotPasswordReducer,
  updateForgetPasswordReducer
} from "./reducers/userReducers";
import { cartReducer, couponDetailsReducer } from "./reducers/cartReducers";
import { loginReducer } from "./reducers/loginReducer";

import {
  productListReducer,
  brandproductsReducer,
  singleProductListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  wishListReducer,
  productSaleReducer
} from "./reducers/productReducer";

import {
  carouselDetailsReducer,
  carouselListReducer
} from "./reducers/carouselReducers";
import { videoListReducer, videoDetailsReducer } from "./reducers/videoReducer";
import { eventListReducer, eventDetailsReducer, singleEventReducer } from "./reducers/eventReducer";
import {
  brandListReducer,
  homeBrandListReducer
} from "./reducers/brandReducer";
import {
  stateListReducer,
  homeStateListReducer
} from "./reducers/stateReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderDeliverReducer,
  orderListMyReducer,
  orderListReducer,
  orderCancelReducer
} from "./reducers/orderReducers";
import {
  homecategoryListReducer,
  hotdealsListReducer
} from "./reducers/homecategoryReducer";

const reducer = combineReducers({
  resetPassword: resetPasswordReducer,
  layout: layoutReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  usersDetail: usersDetailsReducer,
  singleUserDetails: singleUserDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  categoryDetails: categoryDetailsReducer,
  productList: productListReducer,
  brandProductList: brandproductsReducer,
  singleProductList: singleProductListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  listSaleProduct: productSaleReducer,
  wishList: wishListReducer,
  newdrop: newdropReducer,
  // couponDetails: couponDetailsReducer,
  carouselList: carouselListReducer,
  carouselDetails: carouselDetailsReducer,
  videoList: videoListReducer,
  videoDetail: videoDetailsReducer,
  brandList: brandListReducer,
  homeBrandsList: homeBrandListReducer,
  stateList: stateListReducer,
  homeStateList: homeStateListReducer,
  cart: cartReducer,
  couponDetails: couponDetailsReducer,
  otpVerify: emailVerifyReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderCancel: orderCancelReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  showLogin: loginReducer,
  categorydata: categoryReducer,
  bagsizedata: bagsizeReducer,
  materialdata: materialReducer,
  colordata: colorReducer,
  homecategory: homecategoryListReducer,
  hotdeals: hotdealsListReducer,
  eventList: eventListReducer,
  eventDetail: eventDetailsReducer,
  singleEvent: singleEventReducer,
  wolfpackUser:orderCreateWolfpackReducer,
  wolfpackPayOrder:orderPayWolfpackReducer,
  wolfpackOrderList:wolfpackOrderListMyReducer,
  forgotPassword:forgotPasswordReducer,
  updateForgetPassword:updateForgetPasswordReducer
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const couponFromStorage = localStorage.getItem("coupon")
  ? JSON.parse(localStorage.getItem("coupon"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    coupon: couponFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
