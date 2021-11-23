import {
    VIDEO_CAROUSEL_REQUEST,
    VIDEO_CAROUSEL_SUCCESS,
    VIDEO_CAROUSEL_FAIL,
  } from "../constants/videoConstants";
  
  export const videoListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case VIDEO_CAROUSEL_REQUEST:
        return { loading: true, products: [] };
      case VIDEO_CAROUSEL_SUCCESS:
        return {
          loading: false,
          products: action,
        };
      case VIDEO_CAROUSEL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const videoDetailsReducer = (
    state = { product: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case VIDEO_CAROUSEL_REQUEST:
        return { ...state, loading: true };
      case VIDEO_CAROUSEL_SUCCESS:
        return { loading: false, product: action.payload };
      case VIDEO_CAROUSEL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  