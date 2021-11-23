import {
    LOGIN_CAROUSEL_SUCCESS,
    LOGIN_CAROUSEL_FAIL,
  } from "../constants/loginConstants";
  
  export const loginAction = (data) => async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_CAROUSEL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_CAROUSEL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
