import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import Carousel from "react-bootstrap/Carousel";
import { listCarouselImages } from "../actions/carouselActions";
import Loader from "./Loader";
import Message from "./Message";

const ProductCarousel = ({ match, history }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productTopRated = useSelector(state => state.productTopRated);
  const { error, products } = productTopRated;
  const [carouselNum, setCarouselNum] = useState(2);
  const carouselList = useSelector(state => state.carouselList);
  const images = carouselList?.products?.payload;
  // const readMore = images?.link;
  useEffect(() => {
    dispatch(listCarouselImages()).then(() => setLoading(false));
  }, [dispatch]);

  const changeCarousel = num => {
    // if (num > images?.length + 1) setCarouselNum(2);
    // else if (num <= 1) setCarouselNum(images?.length);
    // else
    setCarouselNum(num + 2);
  };
  const changeCarousel1 = num => {
    setCarouselNum(num * 1 + 1);
  };
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <div className="carousel-div">
        <Carousel
          // onClick={e => changeCarousel(carouselNum + 1)}
          onSelect={e => changeCarousel(e)}
          fade
          nextIcon={
            <span>
              {carouselNum > images?.length ? 1 : carouselNum}
              <img src={"/images/border-red.png"} />
            </span>
          }
          prevIcon={
            <span>
              {carouselNum - 1}
              <img src={"/images/border-red.png"} />
            </span>
          }
          nextLabel={"Next"}
          prevLabel={"Previous"}
          className="cus-home-carousel row top_row_carousel"
        >
          {images?.length > 0 &&
            images.map((image, key) => (
              <Carousel.Item
                key={key}
                interval={5000}
                // onClick={e => changeCarousel(key)}
                onClick={() => window.open(image.link)}
              >
                <img
                  className="d-block w-100 banner-image"
                  src={image.image}
                  // height="720"
                  alt="First slide"
                  onClick={key => changeCarousel(key)}
                />
                <div
                  className="carousel-overlay"
                  onClick={key => changeCarousel(key)}
                ></div>
                <Carousel.Caption onClick={key => changeCarousel(key)}>
                  <h3 className="caption-text">get this season's</h3>
                  <h3 className="caption-text">selected items</h3>
                  <a
                    onClick={() => window.open(image.link)}
                    className="carousel-btn edgtf-btn edgtf-btn-gapped_outline"
                  >
                    <span className="edgtf-btn-text">read more</span>
                    <span
                      className="edgtf-gapped-border edgtf-gapped-border-top"
                      style={{
                        background:
                          "linear-gradient(to right, rgb(240 126 69) 0%, rgb(240 126 69) 85%, transparent 85%, transparent 89%, rgb(240 126 69) 89%, rgb(240 126 69) 100%)"
                      }}
                    ></span>
                    <span
                      className="edgtf-gapped-border edgtf-gapped-border-bottom"
                      style={{
                        background:
                          "linear-gradient(to right, rgb(240 126 69) 0%, rgb(240 126 69) 15%, transparent 15%, transparent 19%, rgb(240 126 69) 19%, rgb(240 126 69) 100%)"
                      }}
                    ></span>
                  </a>
                  {/* </div> */}
                </Carousel.Caption>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default ProductCarousel;
