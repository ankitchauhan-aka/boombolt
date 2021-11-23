import axios from "axios";
import {
  HOME_CATEGORY_LIST_REQUEST,
  HOME_CATEGORY_LIST_SUCCESS,
  HOME_CATEGORY_LIST_FAIL,
  HOT_DEALS_LIST_REQUEST,
  HOT_DEALS_LIST_SUCCESS,
  HOT_DEALS_LIST_FAIL,
} from "../constants/homecategoryConstants";

export const listHomeCategory = (
  keyword = "",
  pageNumber = "",
  type = ""
) => async (dispatch) => {
  try {
    dispatch({ type: HOME_CATEGORY_LIST_REQUEST });
    const response = await axios.get("/api/homecategory");
    const data = await response.data;
    dispatch({
      type: HOME_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOME_CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const HotDealsList = (
  keyword = "",
  pageNumber = "",
  type = ""
) => async (dispatch) => {
  try {
    dispatch({ type: HOT_DEALS_LIST_REQUEST });
    const response = await axios.get("/api/hotdeal");
    const data = await response.data;
    dispatch({
      type: HOT_DEALS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOT_DEALS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
