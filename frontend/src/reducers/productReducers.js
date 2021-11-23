import {
  LIST_PRODUCT_FAIL,
  LIST_PRODUCT_REQUEST,
  LIST_PRODUCT_SUCCESS
} from "../constants/productConstants";
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
