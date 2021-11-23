import axios from "axios";
import {
  TOP_NAV_REQUEST,
  TOP_NAV_REQUEST_SUCCESS,
  TOP_NAV_REQUEST_FAIL,
  GET_CATEGARY_REQUEST,
  GET_CATEGARY_REQUEST_SUCCESS,
  GET_CATEGARY_REQUEST_FAIL,
  GET_BAGSIZE_REQUEST,
  GET_BAGSIZE_REQUEST_SUCCESS,
  GET_BAGSIZE_REQUEST_FAIL,
  GET_MATERIAL_REQUEST,
  GET_MATERIAL_REQUEST_SUCCESS,
  GET_MATERIAL_REQUEST_FAIL,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  SINGLE_USER_DETAIL_REQUEST,
  SINGLE_USER_DETAIL_SUCCESS,
  SINGLE_USER_DETAIL_FAIL,
  USERS_DETAIL_REQUEST,
  USERS_DETAIL_SUCCESS,
  USERS_DETAIL_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_REQUEST,
  ADD_WHISHLIST_REQUEST,
  WHISHLIST_REQUEST_SUCCESS,
  WHISHLIST_REQUEST_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  VERIFY_USER_REQUEST,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_FAIL,
  USER_LOGOUT,
  USER_LOGOUT_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_RESET,
  BILLING_ADDRESS_MODIFCATION_REQUEST,
  BILLING_ADDRESS_MODIFCATION_SUCCESS,
  BILLING_ADDRESS_MODIFCATION_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  GET_COLOR_REQUEST,
  GET_COLOR_REQUEST_SUCCESS,
  GET_COLOR_REQUEST_FAIL,
  GET_NEWDROP_REQUEST,
  GET_NEWDROP_REQUEST_SUCCESS,
  GET_NEWDROP_REQUEST_FAIL,

  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_PAY_RESET,
  GET_MYWOLFPACK_ORDER_REQUEST,
  GET_MYWOLFPACK_ORDER_SUCCESS,
  GET_MYWOLFPACK_ORDER_FAIL,

  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_FORGOT_PASSWORD_RESET,

  UPDATE_FORGET_PASSWORD_REQUEST,
  UPDATE_FORGET_PASSWORD_SUCCESS,
  UPDATE_FORGET_PASSWORD_FAIL,
  UPDATE_FORGET_PASSWORD_RESET

} from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
import { WISH_LIST_SUCCESS } from "../constants/productConstants";
export const fetchTopNav = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOP_NAV_REQUEST
    });

    const { data } = await axios.get(`/api/category/nav`);

    dispatch({ type: TOP_NAV_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: TOP_NAV_REQUEST_FAIL,
      payload: message
    });
  }
};

export const getCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CATEGARY_REQUEST
    });

    const { data } = await axios.get(`/api/category/all`);
    dispatch({ type: GET_CATEGARY_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_CATEGARY_REQUEST_FAIL,
      payload: message
    });
  }
};

export const getBagsize = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BAGSIZE_REQUEST
    });

    const { data } = await axios.get(`/api/bagsize`);
    dispatch({ type: GET_BAGSIZE_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_BAGSIZE_REQUEST_FAIL,
      payload: message
    });
  }
};
export const getMaterial = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MATERIAL_REQUEST
    });

    const { data } = await axios.get(`/api/material`);
    dispatch({ type: GET_MATERIAL_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_MATERIAL_REQUEST_FAIL,
      payload: message
    });
  }
};

export const verifyUser = (email, otp) => async dispatch => {
  try {
    dispatch({
      type: VERIFY_USER_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post(
      "/api/users/verifyuser",
      { email, otp },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    dispatch({
      type: VERIFY_USER_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: VERIFY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const register = (
  firstName,
  lastName,
  phone,
  email,
  password
) => async dispatch => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.post(
      "/api/users",
      { firstName, lastName, phone, email, password },
      config
    );
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// login Action........

export const login = (email, password) => async dispatch => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
    localStorage.setItem("jwt_access_token", data.token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

//logout
export const logout = () => dispatch => {
  try {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    localStorage.removeItem("selectedAddress");
    localStorage.removeItem("jwt_access_token");
    dispatch({ type: USER_LOGOUT, payload: 'logout' });
    document.location.href = "/login";
  }catch{
    dispatch({ type: USER_LOGOUT_FAIL, payload: 'logout_fail' });
  }
 
  
};

//listing All Users....

export const getUsersDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USERS_DETAIL_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/users/`, config);
    dispatch({
      type: USERS_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: USERS_DETAIL_FAIL,
      payload: message
    });
  }
};
//reset password
export const resetPassword = (email, otp, password) => async dispatch => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post(
      "/api/users/resetpassword",
      { email, otp, password },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// listing single user with the help of Id...

export const getUserDetails = id => async (dispatch, getState) => {
  try {
    dispatch({
      type: SINGLE_USER_DETAIL_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: SINGLE_USER_DETAIL_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, token failed") {
    //   dispatch(logout());
    // }
    dispatch({
      type: SINGLE_USER_DETAIL_FAIL,
      payload: message
    });
  }
};

// updating user...................

export const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch({ type: USER_UPDATE_SUCCESS });
    dispatch({ type: USERS_DETAIL_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message
    });
  }
};

// fetch all category...
export const fetchAllCategory = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });

    const { data } = await axios.get(`/api/category`);

    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: message
    });
  }
};

export const addWhishList = ids => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_WHISHLIST_REQUEST
    });
    const wishdata = await axios.post(`/api/users/addWhishlist`, ids);
    const { data } = await axios.get(`/api/users/wish/${ids.userId}`);
    dispatch({ type: WHISHLIST_REQUEST_SUCCESS, payload: wishdata });
    dispatch({
      type: WISH_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: WHISHLIST_REQUEST_FAIL,
      payload: message
    });
  }
};

export const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message
    });
  }
};
export const modifyBillingAddress = (userId, addressId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BILLING_ADDRESS_MODIFCATION_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.delete(
      `/api/users/removeBillingAddress/${userId}/${addressId}`
    );
    const BillingAddressData = JSON.parse(localStorage.userInfo);
    BillingAddressData.billingaddresses = data;
    localStorage.setItem("userInfo", JSON.stringify(BillingAddressData));
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: BillingAddressData });

    dispatch({ type: BILLING_ADDRESS_MODIFCATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BILLING_ADDRESS_MODIFCATION_FAIL,
      payload: message
    });
  }
};
export const setDefaultBillingAddress = (userId, addressId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: BILLING_ADDRESS_MODIFCATION_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.put(
      `/api/users/defaultBillingAddress/${userId}/${addressId}`
    );

    const BillingAddressData = JSON.parse(localStorage.userInfo);
    BillingAddressData.billingaddresses = data;
    localStorage.setItem("userInfo", JSON.stringify(BillingAddressData));
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: BillingAddressData });
    dispatch({ type: BILLING_ADDRESS_MODIFCATION_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BILLING_ADDRESS_MODIFCATION_FAIL,
      payload: message
    });
  }
};

export const getColor = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_COLOR_REQUEST
    });

    const { data } = await axios.get(`/api/color`);
    dispatch({ type: GET_COLOR_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_COLOR_REQUEST_FAIL,
      payload: message
    });
  }
};

export const getNewDrop = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_NEWDROP_REQUEST
    });

    const { data } = await axios.get(`/api/newdrop`);
    dispatch({ type: GET_NEWDROP_REQUEST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: GET_NEWDROP_REQUEST_FAIL,
      payload: message
    });
  }
};

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();
    var data = "";
    if (userInfo) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`
        }
      };
      data = await axios.post(`/api/wolfpackregistraion/`, order, config);
    } else {
      data = await axios.post(`/api/wolfpackregistraion/order/book`, order);
    }

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message
    });
  }
};

export const orderPayment = (orderId, amount) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();
    amount = amount * 100;
    const data = await axios.post("/api/wolfpackregistraion/addPayment/payment", {
      orderId,
      amount
    });

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message
    });
  }
};

export const listMyWOlfpackOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MYWOLFPACK_ORDER_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.get(`/api/wolfpackregistraion/`, config);
    dispatch({
      type: GET_MYWOLFPACK_ORDER_SUCCESS,
      payload: data
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: GET_MYWOLFPACK_ORDER_FAIL,
      payload: message
    });
  }
};
// forgot password.....///
export const forgotPasswordAction = (email) => async dispatch => {
  try {
    dispatch({
      type: USER_FORGOT_PASSWORD_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.post(
      "/api/users/forgotpassword",
      { email },
      config
    );

    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const updateForgetPassword = (email, otp, password) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_FORGET_PASSWORD_REQUEST
    });

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { data } = await axios.put(
      "/api/users/forgotpassword",
      { email, otp, password },
      config
    );

    dispatch({
      type: UPDATE_FORGET_PASSWORD_SUCCESS,
      payload: data
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_FORGET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

