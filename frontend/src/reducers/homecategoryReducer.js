import {
  HOME_CATEGORY_LIST_REQUEST,
  HOME_CATEGORY_LIST_SUCCESS,
  HOME_CATEGORY_LIST_FAIL,
  HOT_DEALS_LIST_REQUEST,
  HOT_DEALS_LIST_SUCCESS,
  HOT_DEALS_LIST_FAIL,
} from "../constants/homecategoryConstants";

export const homecategoryListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case HOME_CATEGORY_LIST_REQUEST:
      return { loading: true, data: [] };
    case HOME_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case "HOME_CATEGORY_SELECTED":
      return {
        ...state,
        brandsSelected: action.payload,
      };
    case HOME_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const hotdealsListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case HOT_DEALS_LIST_REQUEST:
      return { loading: true, data: [] };
    case HOT_DEALS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };

    case HOT_DEALS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
