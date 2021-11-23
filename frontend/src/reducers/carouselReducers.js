import {
    IMAGE_CAROUSEL_REQUEST,
    IMAGE_CAROUSEL_SUCCESS,
    IMAGE_CAROUSEL_FAIL,
  } from "../constants/carouselConstants";
  
  export const carouselListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case IMAGE_CAROUSEL_REQUEST:
        return { loading: true, products: [] };
      case IMAGE_CAROUSEL_SUCCESS:
        return {
          loading: false,
          products: action,
        };
      case IMAGE_CAROUSEL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const carouselDetailsReducer = (
    state = { product: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
      case IMAGE_CAROUSEL_REQUEST:
        return { ...state, loading: true };
      case IMAGE_CAROUSEL_SUCCESS:
        return { loading: false, product: action.payload };
      case IMAGE_CAROUSEL_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  