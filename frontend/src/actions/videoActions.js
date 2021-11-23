import axios from "axios";
import {
  VIDEO_CAROUSEL_REQUEST,
  VIDEO_CAROUSEL_SUCCESS,
  VIDEO_CAROUSEL_FAIL
} from "../constants/videoConstants";

export const listCarouselVideos = id => async dispatch => {
  try {
    dispatch({ type: VIDEO_CAROUSEL_REQUEST });

    const { data } = await axios.get(`/api/video`);

    dispatch({
      type: VIDEO_CAROUSEL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VIDEO_CAROUSEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
