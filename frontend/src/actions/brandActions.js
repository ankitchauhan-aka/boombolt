import axios from "axios";
import {
  BRAND_LIST_REQUEST,
  BRAND_LIST_SUCCESS,
  BRAND_LIST_FAIL,
  HOME_BRAND_LIST_REQUEST,
  HOME_BRAND_LIST_SUCCESS,
  HOME_BRAND_LIST_FAIL
} from "../constants/brandConstants";

export const listBrands = (
  keyword = "",
  pageNumber = "",
  type = ""
) => async dispatch => {
  try {
    dispatch({ type: BRAND_LIST_REQUEST });
    let url = `/api/brand?slug=${keyword}&pageNumber=${pageNumber}`;
    if (type) {
      url = `/api/brand?category=${keyword}&pageNumber=${pageNumber}`;
    }
    const { data } = await axios.get(url);
    dispatch({
      type: BRAND_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const homeBrandsList = () => async dispatch => {
  try {
    dispatch({ type: HOME_BRAND_LIST_REQUEST });

    const { data } = await axios.get(`/api/brand/home`);
    dispatch({
      type: HOME_BRAND_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: HOME_BRAND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
