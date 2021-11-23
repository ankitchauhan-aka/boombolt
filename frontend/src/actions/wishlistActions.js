import axios from "axios";

import {
  WISHLIST_ADD_ITEM,

  WISHLIST_WAIT_ITEM,
  CHECK_COUPON_REQUEST,
  WISHLIST_ITEM_FAIL,
  WISHLIST_ITEM_SUCCESS,
  WISHLIST_REMOVE_ITEM,
  WISHLIST_SAVE_SHIPPING_ADDRESS,
  WISHLIST_SAVE_BILLING_ADDRESS,
  WISHLIST_SAVE_PAYMENT_METHOD,
  ADDRESS_UPDATE_REQUEST,
  ADDRESS_UPDATE_SUCCESS,
  BILLING_ADDRESS_UPDATE_REQUEST,
  BILLING_ADDRESS_UPDATE_SUCCESS,
  CHECK_COUPON_SUCCESS,
  CHECK_COUPON_FAIL,
  WISHLIST_BILLING_WAIT_ITEM,
  WISHLIST_BILLING_ADD_ITEM,
  WISHLIST_BILLING_ITEM_FAIL
} from "../constants/wishlistConstants";

export const addToWishlist = (
  id,
  qty,
  tax,
  zipcode,
  shippingCharges,
  coupon
) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  if (!coupon) {
    dispatch({
      type: WISHLIST_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        slug: data.slug,
        short_desc: data.short_desc,
        sku: data.sku,
        image: data?.images[0],
        description: data?.description,
        discount_price: data.discount_price ? data.discount_price : data.price,
        shippingCharges: shippingCharges ? shippingCharges : 0,
        tax: tax,
        price: shippingCharges
          ? data.discount_price
            ? data.discount_price
            : data.price +
              shippingCharges * 1 +
              (data.discount_price ? data.discount_price : data.price * tax) /
                100
          : data.discount_price
          ? data.discount_price
          : data.price +
            (data.discount_price ? data.discount_price : data.price * tax) /
              100,
        countInStock: data.countInStock,
        zipCode: zipcode,
        qty
      }
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart?.cartItems)
    );
  } else if (coupon) {
    dispatch({ type: CHECK_COUPON_REQUEST });
    const dataCoupn = await axios.get(`/api/coupon/coupontitle/${coupon}`);
    if (dataCoupn) {
      dispatch({
        type: WISHLIST_ADD_ITEM,
        payload: {
          product: data._id,
          name: data.name,
          short_desc: data.short_desc,
          image: data.images[0],
          discount_price: data.discount_price
            ? data.discount_price
            : data.price,
          price: shippingCharges
            ? (dataCoupn.data.coupon_type == "AMOUNT"
                ? data.discount_price
                  ? data.discount_price
                  : data.price * 1 -
                    dataCoupn.data.weightage * 1 +
                    (data.discount_price
                      ? data.discount_price
                      : data.price * tax) /
                      100
                : data.discount_price
                ? data.discount_price
                : data.price * 1 -
                  (data.discount_price
                    ? data.discount_price
                    : data.price * (dataCoupn.data.weightage * 1)) /
                    100 +
                  shippingCharges * 1) +
              (data.discount_price ? data.discount_price : data.price * tax) /
                100
            : dataCoupn.data.coupon_type == "AMOUNT"
            ? data.discount_price
              ? data.discount_price
              : data.price * 1 -
                dataCoupn.data.weightage * 1 +
                (data.discount_price ? data.discount_price : data.price * tax) /
                  100
            : data.discount_price
            ? data.discount_price
            : data.price * 1 -
              (data.discount_price
                ? data.discount_price
                : data.price * (dataCoupn.data.weightage * 1)) /
                100 +
              (data.discount_price ? data.discount_price : data.price * tax) /
                100,
          countInStock: data.countInStock,
          coupon: coupon ? coupon : "",
          coupon_amount: dataCoupn.data.weightage,
          coupon_type: dataCoupn.data.coupon_type,
          shippingCharges: shippingCharges ? shippingCharges : 0,
          tax: tax,
          qty
        }
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }
  }
};