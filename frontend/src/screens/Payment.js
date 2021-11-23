import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-grid-carousel";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Tabs from "react-bootstrap/Tabs";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import HeaderWhite from "../components/HeaderWhite";
import axios from "axios";
import { orderPayment, createOrder } from "../actions/orderActions";

const Payment = ({ match, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log(cartItems, "cartItems");
  const [success, setSuccess] = useState(false);
  const [sendAsGift, setSendAsGift] = useState("");
  let shippingCharges = 0;
  const [couponDiscount, setCouponDiscount] = useState(0);
  shippingCharges = cartItems.reduce(
    (acc, item) => (item.select ? acc + item.shippingCharges : acc),
    0
  );
  var payableAmount = JSON.parse(localStorage.getItem("payable_amount"));
  function loadScript(src) {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  useEffect(() => {
    if (cartItems.length === 0 || !payableAmount > 0) {
      alert("please add one Item in cart and place order");
      window.open("/productcatalouge", "_self");
    }
  }, [cartItems]);
  const displayRazorpay = async payable_amount => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log("internet Error");
      return;
    }

    const response = await axios.post("/api/orders/razorpay", {
      payable_amount
    });
    console.log(response, "payment1");

    const { data } = response;
    if (response) {
    } else {
      console.log("some server error");
    }
    let selectedItem = [];
    let paymentId;
    const selected = cartItems?.map(data =>
      data.select == true ? selectedItem.push(data) : "no item"
    );
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      name: "BOOMBOLT",
      description: "one time payment",
      order_id: data.id,
      handler: async response => {
        try {
          paymentId = response.razorpay_payment_id;
          const url = `/api/orders/payment/${paymentId}?payable_amount=${payable_amount}`;
          const captureResponse = await axios.post(url, {});
          const successObj = JSON.parse(captureResponse.data);
          const captured = successObj.captured;

          if (captured) {
            // successNotification("Payment success");
            const details = selectedItem;
            var userDataInfo = JSON.parse(localStorage.getItem("userInfo"));
            setSuccess(true);
            dispatch(
              createOrder({
                orderItems: selectedItem,
                shippingAddress: userDataInfo?.addresses[0],
                billingAddress: userDataInfo?.billingaddresses[0],
                paymentMethod: "upi",
                shippingPrice: shippingCharges ? shippingCharges : 0,
                totalPrice: payable_amount ? payable_amount : 0,
                deliveryInstruction: "deliveryInstruction",
                transactionId: "123456789",
                last4: "qqqq",
                giftMessage: sendAsGift,
                payment_id: paymentId,
                success: true
              })
            );
          }
        } catch (err) {
          // errorNotification("Something went wrong!");
          console.log("error");
        }
      },
      theme: {
        color: "#686CFD"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function(response) {
      alert(response.error.code);
      var userDataInfo = JSON.parse(localStorage.getItem("userInfo"));
      dispatch(
        createOrder({
          orderItems: selectedItem,
          shippingAddress: userDataInfo?.addresses[0],
          billingAddress: userDataInfo?.billingaddresses[0],
          paymentMethod: "upi",
          shippingPrice: shippingCharges ? shippingCharges : 0,
          totalPrice: payable_amount ? payable_amount : 0,
          deliveryInstruction: "deliveryInstruction",
          transactionId: "123456789",
          last4: "qqqq",
          giftMessage: sendAsGift,
          payment_id: paymentId,
          success: false
        })
      );
    });
  };
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-3">
              <p className="text-white mb-0 fs-16">payment</p>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-5">
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col-md-12 text-center">
              <div>
                <img
                  src={"/images/sign-bag-green.png"}
                  className="home-location"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/home-location-green.png"}
                  className="home-location"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/sign_rs-red.png"}
                  className="home-location active"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 offset-md-8 pl-4">
              <div className="shield-li-div">
                <ul className="list-group list-group-horizontal shield-li">
                  <li className="list-group-item">
                    <img src={"/images/shield.png"} className="shield-img" />
                  </li>
                  <li className="list-group-item align-self-center">
                    <p className="safe-and-secure mb-0">
                      safe and secure Payments. Easy returns.
                    </p>
                    <p className="safe-and-secure mb-0">
                      100% Authentic product
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* bank offer  */}
          <div className="row pt-5 pb-3">
            <div className="col-md-8">
              <div className="row brdr-form py-3">
                <div className="col-md-9">
                  <p className="clr-sku mb-0">bank offers</p>
                  <ul className="minus-symbol-ul payment-ul-block mb-0">
                    <li>
                      Bank offer 5% unlimited cashback on flipcart Axis Bank
                      Credit Card T&C
                    </li>
                    <li>
                      Bank Offer 10% of an SBIMastercard Debit card first time
                      transiction. T&C
                    </li>
                  </ul>
                  <p className="mb-0 show-more-link">
                    <a href="" className="text-pink">
                      <span></span>show more
                    </a>
                  </p>
                </div>
                <div className="col-md-3"></div>
              </div>
            </div>
            <div className="col-md-4 pl-4">
              <p className="clr-black fs-16 mb-0 pb-1">
                price details ({cartItems.length} items)
              </p>
              <div className="row no-gutters pb-1">
                <div className="col-md-8">
                  <p className="mb-0 price-details-text">total MRP</p>
                </div>
                <div className="col-md-4 text-right">
                  <p className="mb-0 price-details-text">
                    &#8377; {payableAmount - shippingCharges + couponDiscount}
                  </p>
                </div>
              </div>
              <div className="row no-gutters pb-1">
                <div className="col-md-9">
                  <p className="mb-0 price-details-text">
                    Convenience fee
                    <a href="" className="know-more-link">
                      know more
                    </a>
                  </p>
                </div>
                <div className="col-md-3 text-right">
                  <p className="mb-0 price-details-text">
                    + &#8377; {shippingCharges ? shippingCharges : 0}
                  </p>
                </div>
              </div>
              <div className="row no-gutters pb-1">
                <div className="col-md-8">
                  <p className="mb-0 price-details-text">coupan discount</p>
                </div>
                <div className="col-md-4 text-right">
                  <p className="mb-0 price-details-text">
                    {" "}
                    - &#8377; {couponDiscount}
                  </p>
                </div>
              </div>
              <div className="row no-gutters pb-1">
                <div className="col-md-9">
                  <p className="mb-0 price-details-text font-gtm-medium text-pink">
                    total payable amount
                  </p>
                </div>
                <div className="col-md-3 text-right">
                  <p className="mb-0 price-details-text font-gtm-medium text-pink">
                    &#8377; {payableAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* choose payment method */}
          <div className="row">
            <div className="col-md-8 px-0">
              <h3 className="clr-sku mb-0 font-weight-normal">
                choose payment method
              </h3>
            </div>
          </div>
          <div className="row pt-3 pb-5">
            <div className="col-md-8">
              <div className="row brdr-form">
                <div className="col-md-12">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <div className="row">
                      <div className="col-md-4 pl-0 payment-left-transparent-brdr">
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item className="pay-method-left-nav mr-0 first-link-payment">
                            <Nav.Link eventKey="first">
                              <div className="pay-method-left-div">
                                <ul className="list-group list-group-horizontal shield-li">
                                  <li className="list-group-item align-self-center list-first-li">
                                    <img
                                      src={
                                        "/images/payment_image/layer_017.png"
                                      }
                                      className="left-pay-img"
                                    />
                                  </li>
                                  <li className="list-group-item">
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      phonepe / googlepay
                                    </p>
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      bhim upi
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="pay-method-left-nav mr-0">
                            <Nav.Link eventKey="second">
                              <div className="pay-method-left-div">
                                <ul className="list-group list-group-horizontal shield-li">
                                  <li className="list-group-item align-self-center list-first-li">
                                    <img
                                      src={
                                        "/images/payment_image/layer_030.png"
                                      }
                                      className="left-pay-img"
                                    />
                                  </li>
                                  <li className="list-group-item">
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      cash on delivery
                                    </p>
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      (cash/card/upi)
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="pay-method-left-nav mr-0">
                            <Nav.Link eventKey="third">
                              <div className="pay-method-left-div">
                                <ul className="list-group list-group-horizontal shield-li">
                                  <li className="list-group-item align-self-center list-first-li">
                                    <img
                                      src={
                                        "/images/payment_image/layer_026(1).png"
                                      }
                                      className="left-pay-img"
                                    />
                                  </li>
                                  <li className="list-group-item">
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      credit / debit card
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="pay-method-left-nav mr-0">
                            <Nav.Link eventKey="fourth">
                              <div className="pay-method-left-div">
                                <ul className="list-group list-group-horizontal shield-li">
                                  <li className="list-group-item align-self-center list-first-li">
                                    <img
                                      src={
                                        "/images/payment_image/layer_027(1).png"
                                      }
                                      className="left-pay-img"
                                    />
                                  </li>
                                  <li className="list-group-item">
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      net banking
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="pay-method-left-nav mr-0">
                            <Nav.Link eventKey="fifth">
                              <div className="pay-method-left-div">
                                <ul className="list-group list-group-horizontal shield-li">
                                  <li className="list-group-item align-self-center list-first-li">
                                    <img
                                      src={
                                        "/images/payment_image/layer_0281.png"
                                      }
                                      className="left-pay-img"
                                    />
                                  </li>
                                  <li className="list-group-item">
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      wallets
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="pay-method-left-nav mr-0">
                            <Nav.Link eventKey="sixth">
                              <div className="pay-method-left-div">
                                <ul className="list-group list-group-horizontal shield-li">
                                  <li className="list-group-item align-self-center list-first-li">
                                    <img
                                      src={
                                        "/images/payment_image/layer_0281.png"
                                      }
                                      className="left-pay-img"
                                    />
                                  </li>
                                  <li className="list-group-item">
                                    <p className="safe-and-secure mb-0 font-weight-bold">
                                      Razorpay
                                    </p>
                                  </li>
                                </ul>
                              </div>
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="col-md-8 pl-0">
                        <Tab.Content>
                          <Tab.Pane eventKey="first">
                            <div className="">
                              <p className="clr-black fs-16 mb-0 pt-3 pb-2">
                                pay using UPI
                              </p>
                              <div className="cntr phonepaytext">
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt1"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt1"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/PhonePe-Logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">PhonePe</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt2"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt2"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/google-pay-primary-logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Google Pay</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt3"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt3"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={"/images/payment_image/upi-ar21.png"}
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Other UPI</span>
                                  </label>
                                </div>
                              </div>
                              <div className="pt-3 pb-4">
                                <a href="" className="form-pink-bg-btn">
                                  confirm order
                                </a>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <div className="">
                              <p className="clr-black fs-16 mb-0 pt-3 pb-2">
                                pay on arrival
                              </p>
                              <div className="cntr phonepaytext">
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt1"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt1"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/PhonePe-Logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">PhonePe</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt2"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt2"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/google-pay-primary-logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Google Pay</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt3"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt3"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={"/images/payment_image/upi-ar21.png"}
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Other UPI</span>
                                  </label>
                                </div>
                              </div>
                              <div className="pt-3 pb-4">
                                <a href="" className="form-pink-bg-btn">
                                  confirm order
                                </a>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="third">
                            <div className="">
                              <p className="clr-black fs-16 mb-0 pt-3 pb-2">
                                pay using credit / debit card
                              </p>
                              <div className="cntr phonepaytext">
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt1"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt1"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/PhonePe-Logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">PhonePe</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt2"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt2"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/google-pay-primary-logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Google Pay</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt3"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt3"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={"/images/payment_image/upi-ar21.png"}
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Other UPI</span>
                                  </label>
                                </div>
                              </div>
                              <div className="pt-3 pb-4">
                                <a href="" className="form-pink-bg-btn">
                                  confirm order
                                </a>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="fourth">
                            <div className="">
                              <p className="clr-black fs-16 mb-0 pt-3 pb-2">
                                pay using net banking
                              </p>
                              <div className="cntr phonepaytext">
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt1"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt1"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/PhonePe-Logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">PhonePe</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt2"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt2"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/google-pay-primary-logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Google Pay</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt3"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt3"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={"/images/payment_image/upi-ar21.png"}
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Other UPI</span>
                                  </label>
                                </div>
                              </div>
                              <div className="pt-3 pb-4">
                                <a href="" className="form-pink-bg-btn">
                                  confirm order
                                </a>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="fifth">
                            <div className="">
                              <p className="clr-black fs-16 mb-0 pt-3 pb-2">
                                pay using wallets
                              </p>
                              <div className="cntr phonepaytext">
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt1"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt1"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/PhonePe-Logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">PhonePe</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt2"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt2"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={
                                        "/images/payment_image/google-pay-primary-logo.png"
                                      }
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Google Pay</span>
                                  </label>
                                </div>
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt3"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt3"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={"/images/payment_image/upi-ar21.png"}
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Other UPI</span>
                                  </label>
                                </div>
                              </div>
                              <div className="pt-3 pb-4">
                                <a href="" className="form-pink-bg-btn">
                                  confirm order
                                </a>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="sixth">
                            <div className="">
                              <p className="clr-black fs-16 mb-0 pt-3 pb-2">
                                pay using wallets
                              </p>
                              <div className="cntr phonepaytext">
                                <div className="pt-3 pb-2">
                                  <label
                                    htmlFor="opt1"
                                    className="mb-0 nav-radio"
                                  >
                                    <input
                                      type="radio"
                                      name="rdo"
                                      id="opt1"
                                      className="nav-radio-btn"
                                    />
                                    <img
                                      src={"/images/payment_image/Razorpay.png"}
                                      className="circle-pay-logo"
                                    />
                                    <span className="label">Razorpay</span>
                                  </label>
                                </div>
                              </div>
                              <div className="pt-3 pb-4">
                                <button
                                  onClick={() => displayRazorpay(payableAmount)}
                                  className="form-pink-bg-btn"
                                >
                                  confirm order
                                </button>
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </Tab.Container>
                </div>
              </div>
            </div>
            <div className="col-md-4 pl-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;
