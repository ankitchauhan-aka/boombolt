import React, { Component } from "react";
import Carousel from "react-grid-carousel";
import ScrollAnimation from "react-animate-on-scroll";
import VideoCarousel from "../components/VideoCarousel";
import EventCarousel from "../components/EventCarousel";

const EventActivities = ({ match, history }) => {
  return (
    <>
      <div className="container-fluid px-0 ">
        <div className="row no-gutters">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="h-100 ch-100 px-0 position-relative">
              <div className="d-flex h-100 hover-effect">
                <img
                  width="100%"
                  height="100%"
                  src={"./images/cartoon-box.png"}
                  className="hover-effect-img"
                />
                <div className="img-overlay"></div>
                <div className="hotdeals-inner-div align-self-center">
                  <div className="px-md-3 wolfpackSection">
                    <p className="event-act-heading wolfPackHeading">
                      join the wolfpack
                    </p>
                    <ScrollAnimation
                      animateIn="fadeIn"
                      duration={2}
                      animateOnce={true}
                    >
                      <img src={"./images/border.png"} />
                    </ScrollAnimation>
                    <p className="cartoon-box-text wolfPacktext">
                      Lorem Ipsumis simply dummy text of the printing and
                      typesetting industry.
                    </p>
                    <div className="position-relative">
                      <a
                        href="/wolfpack"
                        className="all-event brder-lr-white edgtf-btn edgtf-btn-gapped_outline"
                      >
                        <span className="edgtf-btn-text text-white">
                          join now
                        </span>
                        <span
                          className="edgtf-gapped-border edgtf-gapped-border-top"
                          style={{
                            background:
                              "linear-gradient(to right, rgb(249 213 194) 0%, rgb(249 213 194) 85%, transparent 85%, transparent 89%, rgb(249 213 194) 89%, rgb(249 213 194) 100%)"
                          }}
                        ></span>
                        <span
                          className="edgtf-gapped-border edgtf-gapped-border-bottom"
                          style={{
                            background:
                              "linear-gradient(to right, rgb(249 213 194) 0%, rgb(249 213 194) 15%, transparent 15%, transparent 19%, rgb(249 213 194) 19%, rgb(249 213 194) 100%)"
                          }}
                        ></span>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* <div className="col-xl-5 col-lg-5 col-md-5 bg-f7f7f7 pb-2">
            <div className="row no-gutters">
              <div className="col-12 text-center py-3">
                <h3 className="category-heading-txt eventsHeading">events & activities</h3>
                <ScrollAnimation
                  animateIn="fadeIn"
                  duration={2}
                  animateOnce={true}
                >
                  <img
                    src={"/images/border-black.png"}
                    className="evnt-balck-border"
                  />
                </ScrollAnimation>
              </div>
            </div>
            <div className="px-4 event-activity-slider">
              <EventCarousel />
            </div>
            <div className="row no-gutters">
              <div className="col-12 pt-3 pb-5">
                <div className="position-relative">
                  <a
                    href="/allEvent"
                    className="all-event px-3 brder-lr-blue py-1 edgtf-btn edgtf-btn-gapped_outline"
                  >
                    <span className="edgtf-btn-text text-black">
                      all events
                    </span>
                    <span
                      className="edgtf-gapped-border edgtf-gapped-border-top"
                      style={{
                        background:
                          "linear-gradient(to right, rgb(42 58 96) 0%, rgb(42 58 96) 85%, transparent 85%, transparent 89%, rgb(42 58 96) 89%, rgb(42 58 96) 100%)"
                      }}
                    ></span>
                    <span
                      className="edgtf-gapped-border edgtf-gapped-border-bottom"
                      style={{
                        background:
                          "linear-gradient(to right, rgb(42 58 96) 0%, rgb(42 58 96) 15%, transparent 15%, transparent 19%, rgb(42 58 96) 19%, rgb(42 58 96) 100%)"
                      }}
                    ></span>
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* video player  */}
        <div className="row no-gutters">
          <div className="col-md-12">
            <VideoCarousel />
          </div>
        </div>
      </div>
      {/* instagram  */}
      <div className="background-image" style={{ marginTop: "-7px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center instagram-heading-div py-3">
              <img src={"/images/instagram.png"} />
              <p className="pt-1 pb-1"># instagram</p>
              <ScrollAnimation
                animateIn="fadeIn"
                duration={2}
                animateOnce={true}
              >
                <img
                  src={"/images/border-black.png"}
                  className="insta-balck-border"
                />
              </ScrollAnimation>
            </div>
          </div>
        </div>
        <div className="container-fluid px-0">
          <div className="row no-gutters">
            <div className="col-md text-center">
              <div className="insta-hover hover-effect">
                <a href="">
                  <img
                    src={"/images/instagram/instagram-1.jpg"}
                    alt="Avatar"
                    className="w-100 insta-sub-img image hover-effect-img insta-pic"
                  />
                  <div className="img-overlay insta-overlay"></div>
                  <div className="middle">
                    <img
                      src={"/images/insta-white.png"}
                      height="30px"
                      width="30px"
                    />
                    <div className="inst-hover-text">SHOP IT</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md text-center">
              <div className="insta-hover hover-effect">
                <a href="">
                  <img
                    src={"/images/instagram/instagram-2.jpg"}
                    alt="Avatar"
                    className="w-100 insta-sub-img image hover-effect-img insta-pic"
                  />
                  <div className="img-overlay insta-overlay"></div>
                  <div className="middle">
                    <img
                      src={"/images/insta-white.png"}
                      height="30px"
                      width="30px"
                    />
                    <div className="inst-hover-text">SHOP IT</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md text-center">
              <div className="insta-hover hover-effect">
                <a href="">
                  <img
                    src={"/images/instagram/instagram-3.jpg"}
                    alt="Avatar"
                    className="w-100 insta-sub-img image hover-effect-img insta-pic"
                  />
                  <div className="img-overlay insta-overlay"></div>
                  <div className="middle">
                    <img
                      src={"/images/insta-white.png"}
                      height="30px"
                      width="30px"
                    />
                    <div className="inst-hover-text">SHOP IT</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md text-center">
              <div className="insta-hover hover-effect">
                <a href="">
                  <img
                    src={"/images/instagram/instagram-4.jpg"}
                    alt="Avatar"
                    className="w-100 insta-sub-img image hover-effect-img insta-pic"
                  />
                  <div className="img-overlay insta-overlay"></div>
                  <div className="middle">
                    <img
                      src={"/images/insta-white.png"}
                      height="30px"
                      width="30px"
                    />
                    <div className="inst-hover-text">SHOP IT</div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md text-center">
              <div className="insta-hover hover-effect">
                <a href="">
                  <img
                    src={"/images/instagram/instagram-3.jpg"}
                    alt="Avatar"
                    className="w-100 insta-sub-img image hover-effect-img insta-pic"
                  />
                  <div className="img-overlay insta-overlay"></div>
                  <div className="middle">
                    <img
                      src={"/images/insta-white.png"}
                      height="30px"
                      width="30px"
                    />
                    <div className="inst-hover-text">SHOP IT</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* customer counting  */}
      {/* <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center py-4">
              {/* <img src={'/images/insta-white.png'} /> 
              <h2 className="text-white customer-count-number">2,00,000+</h2>
              <h4 className="text-white customer-count-txt">
                customers and counting
              </h4>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="hetdeals-head">
        <h1 className="shake-text mb-0">
          <span>2,00,000+ customers and counting</span>
        </h1>
      </div> */}
      <div className="text-center">
        <h1 className="pt-3">
          <span className="colorchangeAnimation">
            {/* 2,00,000+ customers and counting */}
            2,00,000+ customers and 29,000 Pin Codes Covered
          </span>
        </h1>
      </div>
      {/* gifting customization  */}
      <div className="background-image">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center py-4">
              <a href="/cart" className="span-brdr">
                <img src={"/images/gifting4.png"} />
              </a>
              <a href="/wishlist" className="span-brdr">
                <img src={"/images/gifting1.png"} />
              </a>
              <span className="span-brdr">
                <img src={"/images/gifting2.png"} />
              </span>
              <span className="span-brdr">
                <img src={"/images/gifting3.png"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EventActivities;
