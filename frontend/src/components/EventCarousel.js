import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import Carousel from "react-bootstrap/Carousel";
import { eventListCarousel } from "../actions/eventActions";
import Loader from "./Loader";
import Message from "./Message";

const EventCarousel = ({ match, history }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productTopRated = useSelector(state => state.productTopRated);
  const { error, products } = productTopRated;
  const eventList = useSelector(state => state.eventList);
  const events = eventList?.products?.payload;
  useEffect(() => {
    dispatch(eventListCarousel()).then(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="row carousel-div">
        <Carousel
          fade
          nextLabel={"Next"}
          prevLabel={"Previous"}
          className="cus-home-carousel row top_row_carousel"
        >
          {events?.length > 0 &&
            events.map((event, key) => (
              <Carousel.Item key={key} interval={5000}>
                <div className="row no-gutters p-3">
                  <div className="col-6 pl-1">
                    <img src={event.image} width="100%" height="200px" />
                  </div>
                  <div className="col-6 pl-3">
                    <p className="redbull-heading1 mb-0 pt-1">{event.title}</p>
                    <p className="calendar-p mb-0 pt-2">
                      <img src={"/images/calander.png"} />
                      &nbsp;
                      <span>
                        {event.startfrom} To {event.endson}
                      </span>
                    </p>
                    <p className="calendar-p place-p mb-0 pt-2 pb-3">
                      <img src={"/images/place.png"} />
                      &nbsp; <span>{event.location}</span>
                    </p>

                    <a href={`/singleEvent/${event._id}`} className="view-detail-btn">
                      view detail
                    </a>
                  </div>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default EventCarousel;
