import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_BILLING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
  CART_UPDATE_SHIPPING_ADDRESS,
  CART_UPDATE_BILLING_ADDRESS,
  CHECK_COUPON_REQUEST,
  CHECK_COUPON_SUCCESS,
  CHECK_COUPON_FAIL
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, billlingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        x => x.product === item.product  && x.size === item.size && x.color === item.color

      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === existItem.product  && x.size === existItem.size && x.color === existItem.color

              ? item
              : x
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case CART_REMOVE_ITEM:
      console.log(
        action.payload,
        action.payload.prodId,
        action.payload.pSize,
        "tttttttttttttttt",
        state.cartItems
      );

      return {
        ...state,
        cartItems: state.cartItems.filter(
          x =>
            !(
              x.product === action.payload.prodId &&
              x.size === action.payload.pSize
            )
        )
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload?.shippingAddress?.addresses[0]
          ? action.payload?.shippingAddress?.addresses[0]
          : action.payload
      };
    case CART_SAVE_BILLING_ADDRESS:
      return {
        ...state,
        billlingAddress: action.payload
      };
    case CART_UPDATE_SHIPPING_ADDRESS:
      return {
        ...state,
        updateShippingAddress: action.payload
      };
    case CART_UPDATE_BILLING_ADDRESS:
      return {
        ...state,
        updateBillingAddress: action.payload
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      };
    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: []
      };
    default:
      return state;
  }
};

export const couponDetailsReducer = (state = { coupon: {} }, action) => {
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
