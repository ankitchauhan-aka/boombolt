import React, { useState, useEffect, useRef } from "react";
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
import HeaderWhite from "../components/HeaderWhite";
import { register } from "../actions/userActions";

const SignUpScreen = ({ match, history }) => {
  const firstRender = useRef(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(null);

  const [phoneError, setphoneError] = useState(null);
  const [emailError, setemailError] = useState(null);
  const [passError, setpassError] = useState(null);

  const [disable, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  useEffect(() => {
    if (userInfo == "verified") {
      alert("Already Register and verified");
      history.push("/login");
    } else if (userInfo == "not verified" || userInfo == false) {
      // alert("User not verified please verify");
      history.push("/emailvalidation");
    }
  }, [userRegister]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(register(firstName, lastName, phone, email, password));
    history.push("/emailvalidation");
  };

  const nameValidation = e => {
    const val1 = e.target.value.trim();
    if (val1.length < 1) {
      setNameError("Name can not be Empty!");
      setDisabled(true);
    } else if (val1.length < 5) {
      setNameError("Name should be greater then 4 characters");
      setDisabled(true);
    } else {
      setFirstName(val1);
      setDisabled(false);
      setNameError("");
    }
  };
  const phoneValidation = e => {
    const val1 = e.target.value.trim();
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (val1.length < 1) {
      setphoneError("Phone number can not be Empty!");
      setDisabled(true);
    } else if (!pattern.test(val1)) {
      setphoneError("Please enter only numbers");
      setDisabled(true);
    } else if (val1.length < 10) {
      setphoneError("Phone number can not be less then 10 digits");
      setDisabled(true);
    } else {
      setPhone(val1);
      setDisabled(false);
      setphoneError("");
    }
  };

  const emailValidation = e => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const val1 = e.target.value.trim();
    if (val1.length < 1) {
      setemailError("Email can not be Empty!");
      setDisabled(true);
    } else if (!pattern.test(val1)) {
      setemailError("Please enter valid email address.");
      setDisabled(true);
    } else {
      setEmail(val1);
      setDisabled(false);
      setemailError("");
    }
  };
  const passValidation = e => {
    const val1 = e.target.value.trim();

    if (val1.length < 1) {
      setpassError("Password can not be Empty!");
      setDisabled(true);
    } else if (val1 < 4) {
      setpassError("Phone number can not be less then 4 digits");
      setDisabled(true);
    } else {
      setPassword(val1);
      setDisabled(false);
      setpassError("");
    }
  };

  return (
    <>
      <HeaderWhite />
      <div className="background-image px-md-5">
        <div className="container-fluid">
          <div className="row py-4 no-gutters">
            <div className="col-lg-3"></div>
            <div className="col-lg-2 text-center card border-right-0 bg-f7f7f7">
              <h1 className="pt-5 login-heading">Sign Up</h1>
            </div>
            <div className="col-lg-4  card">
              <Form onSubmit={submitHandler} className="py-4 px-4">
                <Form.Group controlId="password">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    required
                    onChange={e => setFirstName(e.target.value)}
                    // onChange={changeFirstName}
                    onBlur={nameValidation}
                  ></Form.Control>
                  {nameError && <p>{nameError}</p>}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                  ></Form.Control>
                  {/* {lastnameError && <p>{lastnameError}</p>} */}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Phone"
                    value={phone}
                    required
                    onChange={e => setPhone(e.target.value)}
                    onBlur={phoneValidation}
                  ></Form.Control>
                  {phoneError && <p>{phoneError}</p>}
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                    onBlur={emailValidation}
                  ></Form.Control>
                  {emailError && <p>{emailError}</p>}
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                    onBlur={passValidation}
                  ></Form.Control>
                  {passError && <p>{passError}</p>}
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  className="form-control mt-2 w-100"
                  disabled={disable}
                >
                  Sign Up
                </Button>
              </Form>
              <p className="mt-2 mb-4 px-4 ">
                {" "}
                Already Registered? <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpScreen;
