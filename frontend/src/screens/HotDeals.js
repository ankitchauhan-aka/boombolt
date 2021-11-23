import Carousel from "react-grid-carousel";
import ScrollAnimation from "react-animate-on-scroll";
import { HotDealsList } from "../actions/homecategoryActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const HotDeals = ({ match, history }) => {
  const dispatch = useDispatch();
  const hotdeal = useSelector(state => state.hotdeals);
  useEffect(() => {
    dispatch(HotDealsList());
  }, [dispatch]);
  const calculateTimeLeft = todate => {
    const difference = +new Date(todate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        months: Math.floor(difference / (1000 * 60 * 60 * 24 * 30)),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    return timeLeft;
  };
  const [timeLeft, setTimeLeft] = useState([]);
  setInterval(() => {
    if (hotdeal?.data?.length > 0) {
      var arr = [];
      var deals = hotdeal?.data?.map(value => {
        var time_left = calculateTimeLeft(value.todate);
        arr.push(time_left);
      });
      setTimeLeft(arr);
    }
  }, 1000);
  const addLeadingZeros = value => {
    value = String(value);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };
  return (
    hotdeal && (
      <>
        <div className="text-center">
          <h1 className="pt-3">
            <span className="colorchangeAnimation">hot&nbsp;deals</span>
          </h1>
        </div>
        <div className="background-image-dark pt-2" key="hotdeals12345">
          <div className="container pb-4">
            <div className="row">
              <div className="col-12 text-center">
                <ScrollAnimation
                  animateIn="fadeIn"
                  duration={2}
                  animateOnce={true}
                ></ScrollAnimation>
                <p className="category-heading-subtxt text-white">
                  take advantage, don't be an average
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid cat-img-div px-0 pb-5">
            <div className="row no-gutters">
              <div className="col-md-12 newarrivals hotdeals">
                <Carousel
                  cols={3}
                  rows={1}
                  gap={30}
                  loop={true}
                  // showDots={true}
                >
                  {hotdeal?.data?.map((deals, key) => (
                    <Carousel.Item key={deals.id}>
                      <div className="image-div-hover-link-outer hotdeals-images-main-div">
                        <div className="new-arival-ul image-div-hover-link-middle hotdeals-images-outer">
                          <div className="image-div-hover-link d-flex">
                            <img
                              width="100%"
                              src={deals.image}
                              alt=" "
                              height="300px"
                            />
                            <div className="hotdeals-inner-div align-self-center">
                              <div className="hotdeals-inner-subdiv hotdeals-images">
                                <a
                                  href={`/productcatalouge/${deals?.categories[0]?.slug}`}
                                  className="py-4 d-block"
                                >
                                  <h3>{deals?.categories[0]?.title}</h3>
                                  <p className="hotdeals-inner-subdiv-p">
                                    hurry up! offer ends in
                                  </p>
                                  <ul key={deals.id} className="timerUl">
                                    <li key={`key0${key}`}>
                                      <span>
                                        {timeLeft[key]?.months &&
                                        addLeadingZeros(timeLeft[key]?.months)
                                          ? addLeadingZeros(
                                              timeLeft[key]?.months
                                            )
                                          : "00"}
                                      </span>
                                      <p>months</p>
                                    </li>
                                    <li key={`key1${key}`}>
                                      <span>
                                        {addLeadingZeros(
                                          timeLeft[key]?.days
                                            ? timeLeft[key]?.days
                                            : "00"
                                        )}
                                      </span>
                                      <p>days</p>
                                    </li>
                                    <li key={`key2${key}`}>
                                      <span>
                                        {addLeadingZeros(
                                          timeLeft[key]?.hours
                                            ? timeLeft[key]?.hours
                                            : "00"
                                        )}
                                      </span>
                                      <p>hours</p>
                                    </li>
                                    <li key={`key3${key}`}>
                                      <span>
                                        {addLeadingZeros(
                                          timeLeft[key]?.minutes
                                            ? timeLeft[key]?.minutes
                                            : "00"
                                        )}
                                      </span>
                                      <p>mins</p>
                                    </li>
                                    <li key={`key4${key}`}>
                                      <span>
                                        {addLeadingZeros(
                                          timeLeft[key]?.seconds
                                            ? timeLeft[key]?.seconds
                                            : "00"
                                        )}
                                      </span>
                                      <p>secs</p>
                                    </li>
                                  </ul>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default HotDeals;
