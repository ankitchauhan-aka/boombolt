import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { orderPayment, createOrder } from "../actions/userActions";
import HeaderWhite from "../components/HeaderWhite";

import "../index.css";

const JoinWolfPack = ({ match, history }) => {
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [total_price, setTotal_price] = useState(1000);

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  // const wolfpack = useSelector(state => state.wolfpackUser);
  var totalPrice = 0;
  var taxPrice = 0;
  const orderCreate = useSelector(state => state.orderCreate);
  const { order } = orderCreate;
  const orderId = order?.data?._id;

  useEffect(() => {
    if (userInfo?.addresses == "") {
      history.push("/address-book");
      alert("please add your address");
    }
  }, [dispatch]);

  // const getOtp = e => {
  //     e.preventDefault();
  //     if (userInfo.email == email) {
  //         dispatch(wolfpackRegister(email));
  //     }
  //     else {
  //     }
  // };

  const submitHandler = e => {
    e.preventDefault();
    if (!error) {
      if (userInfo?.firstName) {
        const id = "paymentMethod";
        var paymentPrice;
        dispatch(orderPayment(id, parseInt(Math.ceil(paymentPrice))));
        setSuccess(true);
      } else {
        history.push("/login");
      }
    } else {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (success && !order) {
      totalPrice = 299;

      var userDataInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(
        createOrder({
          shippingAddress: userDataInfo.addresses[0],
          billingAddress: userDataInfo.billingaddresses[0],
          paymentMethod: "upi",
          totalPrice: 299,
          deliveryInstruction: "deliveryInstruction",
          transactionId: "123456789",
          last4: "qqqq"
        })
      );
    }
  }, [success, order]);

  const submitHandlerFor499 = e => {
    e.preventDefault();
    if (!error) {
      const id = "paymentMethod";
      var paymentPrice;
      dispatch(orderPayment(id, parseInt(Math.ceil(paymentPrice))));
      setSuccess(true);
    } else {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (success && !order) {
      totalPrice = 499;

      var userDataInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(
        createOrder({
          shippingAddress: userDataInfo.addresses[0],
          billingAddress: userDataInfo.billingaddresses[0],
          paymentMethod: "upi",
          totalPrice: 499,
          deliveryInstruction: "deliveryInstruction",
          transactionId: "123456789",
          last4: "qqqq"
        })
      );
    }
  }, [success, order]);

  useEffect(() => {
    if (orderId) {
      history.push(`/wolfpackOrderConfirmation/${orderId}`);
    }
  }, [orderId]);

  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item>wolfpack</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-md-5">
        <div className="row background-image">
          <div className="col-md-4 "></div>
          {/* <div className="col-4 card">
                    <Form className="py-4 px-4">
                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <span className="float-right"> <button className="btn btn-sm" onClick={getOtp}>get otp </button></span> <br/>
                        <Form.Group controlId="password">
                            <Form.Label>OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={e => setOTP(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" className="mt-3" onClick={submitHandler}>Join</Button>
                    </Form>
                </div> */}
          <div className="col-md-4 text-center">
            <p className="pt-2">To join the WolfPack please select any one</p>
            <Button
              type="submit"
              variant="primary"
              className="mt-3 mb-2"
              onClick={submitHandler}
            >
              299/- for 6 months membership
              <br />
              Join
            </Button>
            <br />

            <div className="dahsedBorder"></div>
            <Button
              type="submit"
              variant="primary"
              className="mt-3 mb-5"
              onClick={submitHandlerFor499}
            >
              499/- for 12 months membership
              <br />
              Join
            </Button>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default JoinWolfPack;
