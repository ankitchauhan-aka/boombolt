import axios from "axios";
import {
  STATE_LIST_REQUEST,
  STATE_LIST_SUCCESS,
  STATE_LIST_FAIL,
  HOME_STATE_LIST_REQUEST,
  HOME_STATE_LIST_SUCCESS,
  HOME_STATE_LIST_FAIL
} from "../constants/stateConstants";

export const listStates = (keyword = "", pageNumber = "") => async dispatch => {
  try {
    dispatch({ type: STATE_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/state?keyword=${keyword}&pageNumber=${pageNumber}`
    );
    dispatch({
      type: STATE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: STATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const homeStatesList = zipcode => async dispatch => {
  try {
    dispatch({ type: HOME_STATE_LIST_REQUEST });

    const { data } = await axios.get(`/api/state/home/${zipcode}`);
    dispatch({
      type: HOME_STATE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: HOME_STATE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
