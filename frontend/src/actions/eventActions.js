import axios from "axios";
import {
  EVENT_CAROUSEL_REQUEST,
  EVENT_CAROUSEL_SUCCESS,
  EVENT_CAROUSEL_FAIL,
  SINGLE_EVENT_REQUEST,
  SINGLE_EVENT_SUCCESS,
  SINGLE_EVENT_FAIL,

} from "../constants/eventConstants";

export const eventListCarousel = () => async dispatch => {
  try {
    dispatch({ type: EVENT_CAROUSEL_REQUEST });

    const { data } = await axios.get(`/api/event`);

    dispatch({
      type: EVENT_CAROUSEL_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: EVENT_CAROUSEL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

export const singleEventDetail = id => async dispatch =>{
  try{
    dispatch({type:SINGLE_EVENT_REQUEST});

    const {data} = await axios.get(`/api/event/${id}`);

    dispatch({
      type:SINGLE_EVENT_SUCCESS,
      payload:data
    });
  }
  catch(error){
    dispatch({
      type:SINGLE_EVENT_FAIL,
      payload:
      error.response && error.response.data.message
      ? error.response.data.message
      : error.message
    });
  }
};