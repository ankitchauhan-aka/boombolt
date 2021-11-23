import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_WAIT_ITEM,
  CHECK_COUPON_REQUEST,
  CART_ITEM_FAIL,
  CART_ITEM_SUCCESS,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BILLING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  BILLING_ADDRESS_UPDATE_REQUEST,
  BILLING_ADDRESS_UPDATE_SUCCESS,
  CHECK_COUPON_SUCCESS,
  CHECK_COUPON_FAIL,
  CART_BILLING_WAIT_ITEM,
  CART_BILLING_ADD_ITEM,
  CART_BILLING_ITEM_FAIL
} from "../constants/cartConstants";

export const addToCart = (
  id,
  qty = 1,
  color,
  size,
  select = true,
  tax,
  zipcode,
  shippingCharges,
  coupon
) => async (dispatch, getState) => {
  if (id) {
    var { data } = await axios.get(`/api/products/slug/${id}`);

    if (!data._id) {
      var { data } = await axios.get(`/api/products/${id}`);
    }
  }

  // const { data } = "";

  if (!coupon) {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data?._id,
        name: data?.name,
        slug: data?.slug,
        short_desc: data?.short_desc,
        sku: data?.sku,
        warranty: data?.waranty,
        image: data?.images[0],
        description: data?.description,
        discount_price: data?.discount_price
          ? data?.discount_price
          : data?.price,
        shippingCharges: shippingCharges ? shippingCharges : 0,
        tax: tax,
        colors: data?.colors,
        sizes: data?.size,
        price: shippingCharges
          ? data?.discount_price
            ? data?.discount_price
            : data?.price +
              shippingCharges * 1 +
              (data?.discount_price
                ? data?.discount_price
                : data?.price * tax) /
                100
          : data?.discount_price
          ? data?.discount_price
          : data?.price +
            (data?.discount_price ? data?.discount_price : data?.price * tax) /
              100,
        countInStock: data?.countInStock,
        selling_price: shippingCharges
          ? data?.discount_price
            ? data?.discount_price
            : data?.price +
              shippingCharges * 1 +
              (data?.discount_price
                ? data?.discount_price
                : data?.price * tax) /
                100
          : data?.discount_price
          ? data?.discount_price
          : data?.price +
            (data?.discount_price ? data?.discount_price : data?.price * tax) /
              100,
        zipCode: zipcode,
        qty,
        units: qty,
        color,
        size,
        select
      }
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart?.cartItems)
    );
  } else if (coupon) {
    dispatch({ type: CHECK_COUPON_REQUEST });
    const dataCoupn = await axios.get(`/api/coupon/coupontitle/${coupon}`);
    if (dataCoupn.data) {
      dispatch({
        type: CHECK_COUPON_SUCCESS,
        payload: dataCoupn.data
      });
    }
    // if (dataCoupn) {
    //   dispatch({
    //     type: CART_ADD_ITEM,
    //     payload: {
    //       product: data._id,
    //       name: data.name,
    //       short_desc: data.short_desc,
    //       image: data.images[0],
    //       discount_price: data.discount_price
    //         ? data.discount_price
    //         : data.price,
    //       price: shippingCharges
    //         ? (dataCoupn.data.coupon_type == "AMOUNT"
    //             ? data.discount_price
    //               ? data.discount_price
    //               : data.price * 1 -
    //                 dataCoupn.data.weightage * 1 +
    //                 (data.discount_price
    //                   ? data.discount_price
    //                   : data.price * tax) /
    //                   100
    //             : data.discount_price
    //             ? data.discount_price
    //             : data.price * 1 -
    //               (data.discount_price
    //                 ? data.discount_price
    //                 : data.price * (dataCoupn.data.weightage * 1)) /
    //                 100 +
    //               shippingCharges * 1) +
    //           (data.discount_price ? data.discount_price : data.price * tax) /
    //             100
    //         : dataCoupn.data.coupon_type == "AMOUNT"
    //         ? data.discount_price
    //           ? data.discount_price
    //           : data.price * 1 -
    //             dataCoupn.data.weightage * 1 +
    //             (data.discount_price ? data.discount_price : data.price * tax) /
    //               100
    //         : data.discount_price
    //         ? data.discount_price
    //         : data.price * 1 -
    //           (data.discount_price
    //             ? data.discount_price
    //             : data.price * (dataCoupn.data.weightage * 1)) /
    //             100 +
    //           (data.discount_price ? data.discount_price : data.price * tax) /
    //             100,
    //       countInStock: data.countInStock,
    //       coupon: coupon ? coupon : "",
    //       coupon_amount: dataCoupn.data.weightage,
    //       coupon_type: dataCoupn.data.coupon_type,
    //       shippingCharges: shippingCharges ? shippingCharges : 0,
    //       tax: tax,
    //       color: data?.color,
    //       size: data?.size,
    //       qty
    //     }
    //   });
    // }
    if (dataCoupn) {
      localStorage.setItem("coupon", JSON.stringify(dataCoupn.data));
    }
  }
};
export const addToCartFromCart = (
  id,
  qty,
  tax,
  shippingCharges,
  coupon
) => async (dispatch, getState) => {
  if (!coupon) {
    var data1 = JSON.parse(localStorage.getItem("cartItems"));

    data1.map(data => {
      if (data.product == id) {
        data.qty = qty;
        localStorage.setItem("cartItems", JSON.stringify([data]));
      }
    });
  }
};

export const removeFromCart = id => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = address => async dispatch => {
  dispatch({
    type: CART_WAIT_ITEM
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { data } = await axios.post("/api/users/address", address, config);

  if (address.userId) {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    });
    const userInfo = JSON.parse(localStorage.userInfo);
    userInfo.addresses = data.addresses;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: userInfo
    });
  } else {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data.addresses[0]
    });
    const userInfo = data;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: userInfo
    });
  }
};

export const updateShippingAddress = (address, userid, addressid) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ADDRESS_UPDATE_REQUEST
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { data } = await axios.post(
    `/api/users/updateAddress/${userid}/${addressid}`,
    address,
    config
  );
  dispatch({
    type: ADDRESS_UPDATE_SUCCESS,
    payload: address
  });
  const userInfo = JSON.parse(localStorage.userInfo);
  userInfo.addresses = data.addresses;
  dispatch({ type: "USER_LOGIN_SUCCESS", payload: userInfo });
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const updateBillingAddress = (
  address,
  userid,
  billingAddressid
) => async (dispatch, getState) => {
  dispatch({
    type: BILLING_ADDRESS_UPDATE_REQUEST
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { data } = await axios.post(
    `/api/users/updateBillingAddress/${userid}/${billingAddressid}`,
    address,
    config
  );
  dispatch({
    type: BILLING_ADDRESS_UPDATE_SUCCESS,
    payload: address
  });
  const userInfo = JSON.parse(localStorage.userInfo);
  userInfo.billingaddresses = data.billingaddresses;
  dispatch({
    type: CART_ITEM_SUCCESS,
    payload: userInfo
  });
  dispatch({ type: "USER_LOGIN_SUCCESS", payload: userInfo });
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const saveBillingAddress = address => async dispatch => {
  dispatch({
    type: CART_WAIT_ITEM
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { data } = await axios.post(
    "/api/users/billlingaddress",
    address,
    config
  );

  dispatch({
    type: CART_SAVE_BILLING_ADDRESS,
    payload: address
  });
  const userInfo = JSON.parse(localStorage.userInfo);
  userInfo.billingaddresses = data.billingaddresses;
  dispatch({
    type: "USER_UPDATE_PROFILE_SUCCESS",
    payload: userInfo
  });
  dispatch({ type: "USER_LOGIN_SUCCESS", payload: userInfo });
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const getAddress = id => async dispatch => {
  try {
    dispatch({ type: CART_WAIT_ITEM });
    const { data } = await axios.get(`/api/users/getaddress/${id}`);
    dispatch({
      type: CART_ITEM_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CART_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const CheckCoupon = coupon => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_COUPON_REQUEST });

    const { data } = await axios.get(`/api/coupon/coupontitle/${coupon}`);

    dispatch({
      type: CHECK_COUPON_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CHECK_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const getCoupon = () => async dispatch => {
  try {
    dispatch({ type: CHECK_COUPON_REQUEST });
    const data = await axios.get(`/api/coupon/`);
    dispatch({
      type: CHECK_COUPON_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CHECK_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
