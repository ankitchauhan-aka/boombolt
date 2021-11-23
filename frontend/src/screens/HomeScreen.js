import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Meta from "../components/Meta";
import "../index.css";
import Carousel from "react-bootstrap/Carousel";
import NewArrivals from "./NewArrivals";
import HotDeals from "./HotDeals";
import HotDealsNew from "./HotDealsNew";
import EventActivities from "./EventActivities";
import Address from "./Address";
import HomeCategory from "./HomeCategory";
import Header1 from "../components/Header1";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const directionButtons = direction => {
    return (
      <span
        aria-hidden="true"
        className={direction === "Next" ? "button-next" : "button-prev"}
      >
        {direction}
      </span>
    );
  };
  return (
    <>
      <Header1 />
      <ProductCarousel />
      {/* categories section  */}
      <HomeCategory />
      {/* new arrivals section  */}
      <NewArrivals />
      {/* hot deals  */}
      {/* <HotDealsNew /> */}

      <HotDeals />
      {/* event and activities  */}
      <EventActivities />
    </>
  );
};

export default HomeScreen;
