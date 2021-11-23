import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  WISH_LIST_REQUEST,
  WISH_LIST_SUCCESS,
  WISH_LIST_FAIL,
  SINGLE_PRODUCT_LIST_REQUEST,
  SINGLE_PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  BRAND_PRODUCT_DETAILS_REQUEST,
  PRODUCT_SALE_REQUEST,
  PRODUCT_SALE_SUCCESS,
  PRODUCT_SALE_FAIL,
  LIST_PRODUCT_FAIL,
  LIST_PRODUCT_REQUEST,
  LIST_PRODUCT_SUCCESS
} from "../constants/productConstants";

import {
  ADD_WHISHLIST_REQUEST,
  WHISHLIST_REQUEST_SUCCESS,
  WHISHLIST_REQUEST_FAIL
} from "../constants/userConstants";

export const productListReducer = (
  state = { products: [], filter_products: [] },
  action
) => {
  switch (action.type) {
    case LIST_PRODUCT_REQUEST:
      return {
        loading: true,
        products: []
        // minPrice: ({...state}).minAll,
        // maxPrice: ({...state}).maxAll
        // ...state
      };
    case LIST_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case LIST_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const wishListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case WISH_LIST_REQUEST:
      return { loading: true, products: [] };
    case WISH_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case WISH_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const addWishListReducer = (state = { products: [] }, action) => {
//   switch (action.type) {
//     case ADD_WHISHLIST_REQUEST:
//       return { loading: true, products: [] };
//     case WHISHLIST_REQUEST_SUCCESS:
//       return {
//         loading: false,
//         products: action.payload,
//       };
//     case WHISHLIST_REQUEST_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
export const brandproductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case BRAND_PRODUCT_DETAILS_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleProductListReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT_LIST_REQUEST:
      return { loading: true, product: [] };
    case SINGLE_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        product: action.payload
      };
    case SINGLE_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: action.data.data };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const productTopRatedReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSaleReducer = (
  state = { homeProductsListing: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_SALE_REQUEST:
      return { loading: true, homeProductsListing: [] };
    case PRODUCT_SALE_SUCCESS:
      return { loading: false, homeProductsListing: action.payload };
    case PRODUCT_SALE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
