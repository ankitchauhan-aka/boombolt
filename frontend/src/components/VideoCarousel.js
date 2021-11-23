import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import Carousel from "react-bootstrap/Carousel";
import { listCarouselVideos } from "../actions/videoActions";
import Loader from "./Loader";
import Message from "./Message";

const VideoCarousel = ({ match, history }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productTopRated = useSelector(state => state.productTopRated);
  const { error, products } = productTopRated;
  const videoList = useSelector(state => state.videoList);
  const videos = videoList?.products?.payload;
  useEffect(() => {
    dispatch(listCarouselVideos()).then(() => setLoading(false));
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="carousel-div">
        <Carousel
          fade
          nextLabel={"Next"}
          prevLabel={"Previous"}
          className="cus-home-carousel row top_row_carousel"
        >
          {videos?.length > 0 &&
            videos.map((video, key) => (
              <Carousel.Item
                style={{ zIndex: "9 !important" }}
                key={key}
                interval={5000}
                // onClick={() =>
                //     window.open(video.link)
                // }
              >
                <video
                  controls
                  poster={video.image}
                  width="100%"
                  autoPlay
                  className="home_video"
                  autoPlay="true"
                >
                  <source src={video.mp4file} type="video/mp4" />
                </video>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default VideoCarousel;
