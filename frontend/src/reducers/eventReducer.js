import {
  EVENT_CAROUSEL_REQUEST,
  EVENT_CAROUSEL_SUCCESS,
  EVENT_CAROUSEL_FAIL,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS,
  SINGLE_EVENT_FAIL,
} from "../constants/eventConstants";

export const eventListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case EVENT_CAROUSEL_REQUEST:
      return { loading: true, products: [] };
    case EVENT_CAROUSEL_SUCCESS:
      return {
        loading: false,
        products: action,
      };
    case EVENT_CAROUSEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case EVENT_CAROUSEL_REQUEST:
      return { ...state, loading: true };
    case EVENT_CAROUSEL_SUCCESS:
      return { loading: false, product: action.payload };
    case EVENT_CAROUSEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const singleEventReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case SINGLE_EVENT_REQUEST:
      return { ...state, loading: true };
    case SINGLE_EVENT_SUCCESS:
      return { loading: false, product: action.payload };
    case SINGLE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
