import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import "../index.css";
import Carousel from "react-bootstrap/Carousel";
import NewArrivals from "./NewArrivals";
import HotDeals from "./HotDeals";
import EventActivities from "./EventActivities";
import Address from "./Address";
import HomeCategory from "./HomeCategory";
import Header1 from "../components/Header1";
import { login, getUserDetails } from "../actions/userActions";
import Message from "../components/Message";
import HeaderWhite from "../components/HeaderWhite";


const SignInScreen = ({ match, history }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const userId = userInfo?._id;
  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
    if (userInfo === "User Not Verified") {
      setErrorMessage("Password is incorrect")
    }
  };
  useEffect(() => {
    if (userId) {
      history.push(`/dashboard`);
    }
  }, [history,userInfo]);

  useEffect(() => {
    if (userLogin.error) {
      setErrorMessage("Email is not registered")   
    }
  }, [userLogin]);

  return (
    <>
      <HeaderWhite />
      <div className="background-image px-md-5">
        <div className="container-fluid">
          <div className="row py-4 no-gutters">
            <div className="col-lg-3"></div>
            <div className="col-lg-2 text-center  border border-right-0  bg-f7f7f7">
              <h1 className="pt-4 login-heading">Sign In</h1>
              <p className="mt-3">
                Get access to your Orders, Wishlist and more
              </p>
            </div>
            <div className="col-lg-4 card bg-">
              <Form onSubmit={submitHandler} className="py-4 px-4">
                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" className="mt-3 w-100">
                  Sign In
                </Button>
                <br />
                <br />
                {errorMessage && <Message variant="danger">{errorMessage}</Message>}
              </Form>

              <p className="px-4">
                If Not Registered, Please Click on{" "}
                <a href="/signup" className="text-success">
                  SignUp
                </a>
              </p>
              <p className="px-4 pb-3">
                <a href="/forgotPassword" className="text-danger">
                  Forgot Password ?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInScreen;
