import axios from "axios";
import {
  IMAGE_CAROUSEL_REQUEST,
  IMAGE_CAROUSEL_SUCCESS,
  IMAGE_CAROUSEL_FAIL
} from "../constants/carouselConstants";

export const listCarouselImages = id => async dispatch => {
  try {
    dispatch({ type: IMAGE_CAROUSEL_REQUEST });

    const { data } = await axios.get(`/api/banner`);

    dispatch({
      type: IMAGE_CAROUSEL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: IMAGE_CAROUSEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
