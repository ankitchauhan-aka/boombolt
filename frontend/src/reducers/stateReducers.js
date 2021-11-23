import {
  STATE_LIST_REQUEST,
  STATE_LIST_SUCCESS,
  STATE_LIST_FAIL,
  HOME_STATE_LIST_REQUEST,
  HOME_STATE_LIST_SUCCESS,
  HOME_STATE_LIST_FAIL
} from "../constants/stateConstants";

export const stateListReducer = (state = { states: [] }, action) => {
  switch (action.type) {
    case STATE_LIST_REQUEST:
      return { bloading: true, states: [] };
    case STATE_LIST_SUCCESS:
      return {
        bloading: false,
        states: action.payload
        // pages: action.payload.pages,
        // page: action.payload.page,
      };
    case STATE_LIST_FAIL:
      return { bloading: false, berror: action.payload };
    default:
      return state;
  }
};
export const homeStateListReducer = (
  state = { homeStatesListing: [] },
  action
) => {
  switch (action.type) {
    case HOME_STATE_LIST_REQUEST:
      return { bloading: true, homeStatesListing: [] };
    case HOME_STATE_LIST_SUCCESS:
      return {
        bloading: false,
        homeStatesListing: action.payload
        // pages: action.payload.pages,
        // page: action.payload.page,
      };
    case HOME_STATE_LIST_FAIL:
      return { bloading: false, berror: action.payload };
    default:
      return state;
  }
};
