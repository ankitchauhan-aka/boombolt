import {
    WISHLIST_SAVE_PAYMENT_METHOD,
    WISHLIST_UPDATE_SHIPPING_ADDRESS,
    WISHLIST_SAVE_SHIPPING_ADDRESS,
    WISHLIST_UPDATE_BILLING_ADDRESS,
    WISHLIST_SAVE_BILLING_ADDRESS,
    WISHLIST_CLEAR_ITEMS,
    WISHLIST_ADD_ITEM,
    WISHLIST_REMOVE_ITEM,
    CHECK_COUPON_REQUEST,
    CHECK_COUPON_SUCCESS,
    CHECK_COUPON_FAIL,

  } from "../constants/wishlistConstants";
  
  export const wishlistReducer = (
    state = { cartItems: []},
    action
  ) => {
    switch (action.type) {
      case WISHLIST_ADD_ITEM:
        const item = action.payload;
  
        const existItem = state.cartItems.find(x => x.product === item.product);
  
        if (existItem) {
          return {
            ...state,
            cartItems: state.cartItems.map(x =>
              x.product === existItem.product ? item : x
            )
          };
        } else {
          return {
            ...state,
            cartItems: [...state.cartItems, item]
          };
        }
      case WISHLIST_REMOVE_ITEM:
        return {
          ...state,
          cartItems: state.cartItems.filter(x => x.product !== action.payload)
        };
      case WISHLIST_SAVE_SHIPPING_ADDRESS:
        return {
          ...state,
          shippingAddress: action.payload?.shippingAddress?.addresses[0]
            ? action.payload?.shippingAddress?.addresses[0]
            : action.payload
        };
      case WISHLIST_SAVE_BILLING_ADDRESS:
        return {
          ...state,
          billlingAddress: action.payload
        };
      case WISHLIST_UPDATE_SHIPPING_ADDRESS:
        return {
          ...state,
          updateShippingAddress: action.payload
        };
      case WISHLIST_UPDATE_BILLING_ADDRESS:
        return {
          ...state,
          updateBillingAddress: action.payload
        };
      case WISHLIST_SAVE_PAYMENT_METHOD:
        return {
          ...state,
          paymentMethod: action.payload
        };
      case WISHLIST_CLEAR_ITEMS:
        return {
          ...state,
          cartItems: []
        };
      default:
        return state;
    }
  };
  
  export const couponsDetailsReducer = (state = { coupon: {} }, action) => {
    switch (action.type) {
      case CHECK_COUPON_REQUEST:
        return {
          ...state,
          loading: true
        };
      case CHECK_COUPON_SUCCESS:
        return {
          loading: false,
          order: action.payload
        };
      case CHECK_COUPON_FAIL:
        return {
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  