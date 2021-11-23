import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import "../index.css";
import Carousel from "react-bootstrap/Carousel";
import NewArrivals from "./NewArrivals";
import HotDeals from "./HotDeals";
import Message from "../components/Message";
import EventActivities from "./EventActivities";
import Address from "./Address";
import HomeCategory from "./HomeCategory";
import Header1 from "../components/Header1";

import { verifyUser, register } from "../actions/userActions";

const EmailValidationScreen = ({ match, history }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const otpVerify = useSelector(state => state.otpVerify);
  const { loading, error, userInfo } = otpVerify;

  const submitHandler = e => {
    e.preventDefault();
    dispatch(verifyUser(email, otp));
    if (userInfo == "Wrong otp") {
      setMessage("wrong otp");
    } else {
      history.push("/login");
    }
  };

  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark px-md-5">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item href="/signp">signup</Breadcrumb.Item>
                <Breadcrumb.Item>email validation</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="row background-image py-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-2 text-center card border-right-0 bg-f7f7f7">
          <h4 className="pt-5 login-heading">
            <div className="mt-5 forgetPassword">Email<br></br>Validation</div>
          </h4>
        </div>
        <div className="col-lg-4 card">
          <Form onSubmit={submitHandler}  className="py-4 px-4">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Otp</Form.Label>
              <Form.Control
                type="text"
                placeholder="otp"
                value={otp}
                required
                onChange={e => setOtp(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="form-control mt-2"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EmailValidationScreen;
