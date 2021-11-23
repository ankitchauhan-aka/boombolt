import {
    LOGIN_CAROUSEL_REQUEST,
    LOGIN_CAROUSEL_SUCCESS,
    LOGIN_CAROUSEL_FAIL,
  } from "../constants/loginConstants";
  
  export const loginReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case LOGIN_CAROUSEL_REQUEST:
        return { loading: true, products: [] };
      case LOGIN_CAROUSEL_SUCCESS:
        return {
          loading: false,
          products: action,
        };
      case LOGIN_CAROUSEL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
