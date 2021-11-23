import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab, Modal } from "react-bootstrap";
import UserNav from "../screens/useNav";
import {
  listMyOrders,
  cancelOrder,
  returnOrder
} from "../actions/orderActions";
import _ from "underscore";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";
import { addToCart } from "../actions/cartActions";
import Message from "../components/Message";

const AllOrders = ({ history }) => {
  const dispatch = useDispatch();
  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders } = orderListMy;
  const defaultOrders = orderListMy?.orders; //[...orders];
  const [orders, setOrders] = useState([]);
  const cancel = useSelector(state => state.orderCancel);
  const { loading: loadingDeliver, success: successDeliver } = cancel;
  const [key, setKey] = useState("allorders");
  const [totalOrder, setTotalOrder] = useState([]);
  const [time, setTime] = useState("Past 3 Months");
  const [showModal, setShow] = useState(false);
  const [showReturnModal, setReturnShow] = useState(false);
  const [order, setOrder] = useState([]);
  const [reason, setReason] = useState("");
  const [searchString, setSearchString] = useState("");
  const [qnty, setQty] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [clr, setColor] = useState([]);
  const [zipCode, setZipCode] = useState();

  const singleProductById = useSelector(state => state.singleProductById);

  // useEffect(() => {
  //   if (proId) {
  //     dispatch(listProductDetails(proId));
  //   }
  // }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleReturnClose = () => setReturnShow(false);

  useEffect(
    his => {
      pastData("Past 3 Months");
      dispatch(listMyOrders());
    },
    [dispatch]
  );

  useEffect(() => {
    if (defaultOrders) {
      setOrders(_.sortBy(defaultOrders, "createdAt").reverse());
    }
  }, [defaultOrders]);

  const cancelCurrentOrder = orderDetails => {
    dispatch(cancelOrder(orderDetails, { reason: reason }));
  };
  const returnCurrentOrder = orderDetails => {
    dispatch(returnOrder(orderDetails, { reason: reason }));
  };
  const pastData = val => {
    setTime(val);
    var threeMonthAgo = new Date(
      new Date().getFullYear() - 1,
      new Date().getMonth(),
      new Date().getDate()
    );
    var monthsOrder = [];
    orders.map(order => {
      var date = new Date(order.createdAt);
      if (val == "Past 3 Months" && date > threeMonthAgo) {
        monthsOrder.push(order);
      } else if (val == "All Orders") {
        monthsOrder.push(order);
      }
    });
    setTotalOrder(monthsOrder);
  };

  const addToCartHandler = order => {
    if (order.product) {
      dispatch(addToCart(order.product, qnty, "", zipCode, "", clr));
      history.push(`/cart`);
    }
  };
  const [filter, setFilter] = useState(true);
  function toggleFilter() {
    setFilter(!filter);
  }

  const formatDate = value => {
    var year = value.substr(0, 4);
    var month = value.substring(5, 7);
    var day = value.substring(8, 10);
    return month + "/" + day + "/" + year;
  };

  const filterOrder = value => {
    let searchedOrders = defaultOrders.filter(
      order =>
        order._id.includes(value) ||
        order.orderItems.filter(item =>
          item.name.toLowerCase().includes(value.toLowerCase())
        ).length
    );
    setOrders(_.sortBy(searchedOrders, "createdAt").reverse());
    setSearchString(value);
  };
  const trackOrder = shipment_id => {
    let config = {
      method: "post",
      url: "https://apiv2.shiprocket.in/v1/external/auth/login",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        email: "sshivendra6387@gmail.com",
        password: "sshivendra6387"
      })
    };
    axios(config)
      .then(function(response) {
        config = {
          method: "get",
          url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipment_id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.data.token}`
          }
        };
        axios(config)
          .then(function(response) {
            let awb = response.data.tracking_data.shipment_track[0].awb_code;
            window.open(`https://shiprocket.co/tracking/${awb}`);
          })
          .catch(function(error) {
            console.log(error);
            alert("Your Order is not yet Shipped");
          });
      })
      .catch(function(error) {
        console.log(error, "shipmentlogin");
      });
  };
  const submitHandler = e => {};
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item>my orders</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>

      <div className="background-image px-md-2">
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col-md-12 text-center">
              <div>
                <img
                  src={"/images/sign-bag-red.png"}
                  className="home-location active"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/home-location-green.png"}
                  className="home-location"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/sign_rs-green.png"}
                  className="home-location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row background-image">
        <div className="col-md-3 p-0 myOrdersMobileUi">
          <div className="row my-4 p-0">
            <div className="col-md-12 p-0">
              <h4 className="welcome-user-name myOrders mb-3 mx-5">
                My Orders
              </h4>
            </div>
          </div>
          <button
            className="d-block d-md-none filter-btn mb-3"
            type="button"
            onClick={toggleFilter}
          >
            My Orders
          </button>

          <div
            className={`col-md-12 col-lg-12 col-xl-12 ${
              filter ? "d-none" : "d-block"
            } d-md-block`}
          >
            <div className="row">
              <div className="col-md-12 col-lg-12 ml-4">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-9 myOrderTabs">
          <div className="row">
            <div className="col-md-6 ml-auto search-bar">
              <div className="input-group searchInputMobileUi">
                <input
                  type="text"
                  name="q"
                  className="form-control form-control-md search-input search-wishlist seachInputText"
                  placeholder="Search"
                  onChange={e => filterOrder(e.target.value)}
                  value={searchString}
                  style={{ background: "#cccccc", color: "#000" }}
                />
                <div className="input-group-append">
                  <button className="btn btn-search" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt-5 allTabsOuter">
            <div className="col-md-12 alltabsDetail">
              <Tabs
                className="user-order-cus-tabs alltabs"
                id="controlled-tab-example"
                activeKey={key}
                variant="pills"
                onSelect={k => setKey(k)}
              >
                <Tab eventKey="allorders" title="All Order" className="abc">
                  <div className="row clr-000 mt-3">
                    {orders && orders.length > 0 ? (
                      // "djfkljdlfks"
                      orders.map((order, index) => (
                        <div key={index} className="col-12 my-8 allOrderDetail">
                          <div className="order-placed-header">
                            <div className="row">
                              <div className="col-md-3">
                                <p className="mb-0 order-content">
                                  ORDER PLACED ON{" "}
                                  <span className="order-value">
                                    {formatDate(order.createdAt.substr(0, 10))}
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-3">
                                <p className="mb-0 order-content">
                                  TOTAL{" "}
                                  <span className="order-value">
                                    <b>
                                      ${" "}
                                      {Number(
                                        order.totalPrice.toFixed(2)
                                      ).toLocaleString()}
                                    </b>
                                  </span>
                                </p>
                              </div>
                              <div className="col-md-6 text-md-right text-left">
                                <p className="mb-0 order-content">
                                  ORDER #
                                  <span className="order-value">
                                    {order._id}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="row mt-3">
                            {order.orderItems.map((item, index) => (
                              <div key={index} className="col-md-12">
                                <div className="card-hover px-3">
                                  <div className="row mt-3">
                                    <div className="col-md-4 text-center align-self-center mb-5">
                                      <img src={item.image} className="w-75" />
                                    </div>
                                    <div className="col-md-8">
                                      <div className="row mb-3 py-3">
                                        <div className="col-md-12">
                                          <div className="row">
                                            <div className="col-lg-8 item-des">
                                              <p className="search-list-product-name">
                                                {item.description}
                                              </p>
                                              <p className="search-list-product-name">
                                                color:{" "}
                                                <span className="text-capitalize">
                                                  {item.color}
                                                </span>
                                              </p>
                                              <p className="search-list-product-name">
                                                size: {item.size}
                                              </p>
                                              <p className="search-list-product-name">
                                                waranty: {item.warranty}
                                              </p>
                                              <p className="search-list-product-name">
                                                #{item.sku}
                                              </p>
                                              <p className="cross-text">
                                                {/* <strike className="doller-cross">$499</strike> */}
                                                <span className="live-price">
                                                  $
                                                  {Number(
                                                    item.price
                                                  ).toLocaleString()}{" "}
                                                  x {item.qty}
                                                </span>
                                              </p>
                                            </div>
                                            <div className="col-lg-4 order-buttons">
                                              {order.awb_code &&
                                              order.awb_code !== "" ? (
                                                <a
                                                  href={`/TrackOrder/${order.awb_code}`}
                                                >
                                                  <button className="proceed-checkout-btn bg-dark text-white AllOrderTrackBtn px-2">
                                                    Track Order
                                                  </button>
                                                </a>
                                              ) : (
                                                <button
                                                  onClick={() =>
                                                    trackOrder(
                                                      order.shipment_id
                                                    )
                                                  }
                                                  className="proceed-checkout-btn bg-dark text-white AllOrderTrackBtn px-2"
                                                >
                                                  Track Order
                                                </button>
                                              )}
                                              {/* <a> */}
                                              <button
                                                className="proceed-checkout-btn mt-3 AllOrderAgainBtn"
                                                onClick={() =>
                                                  addToCartHandler(item)
                                                }
                                              >
                                                Order Again
                                              </button>
                                              {/* </a> */}
                                            </div>
                                            {/* <div className="col-lg-4 order-buttons">
                                              <a href=" ">
                                                <button className="proceed-checkout-btn bg-dark text-white AllOrderTrackBtn px-2">
                                                  Track Order
                                                </button>
                                              </a>
                                              <button
                                                className="proceed-checkout-btn mt-3 AllOrderAgainBtn"
                                                onClick={() =>
                                                  addToCartHandler(item)
                                                }
                                              >
                                                Order Again
                                              </button>
                                            </div> */}
                                            <div className="col-lg-4"></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <Col md={12} className="noOrders">
                        <Message variant="danger">No Order</Message>
                      </Col>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="openorder" title="Open Order">
                  <div className="row clr-000 mt-3">
                    {orders && orders.length > 0 ? (
                      orders.map(order =>
                        order.isDelivered == false &&
                        order.isCancelled == false ? (
                          <div className="col-12 my-8">
                            <div className="order-placed-header">
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="mb-0 order-content">
                                    ORDER PLACED ON{" "}
                                    <span className="order-value">
                                      {formatDate(
                                        order.createdAt.substr(0, 10)
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div className="col-md-3">
                                  <p className="mb-0 order-content">
                                    TOTAL{" "}
                                    <span className="order-value">
                                      <b>
                                        ${" "}
                                        {Number(
                                          order.totalPrice.toFixed(2)
                                        ).toLocaleString()}
                                      </b>
                                    </span>
                                  </p>
                                </div>
                                <div className="col-md-6 text-md-right text-left">
                                  <p className="mb-0 order-content">
                                    ORDER #
                                    <span className="order-value">
                                      {order._id}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              {order.orderItems.map((item, index) => (
                                <div key={index} className="col-md-12">
                                  <div className="card-hover px-3">
                                    <div className="row mt-3">
                                      <div className="col-md-4 text-center align-self-center mb-5">
                                        <img
                                          src={item.image}
                                          className="w-75"
                                        />
                                      </div>
                                      <div className="col-md-8">
                                        <div className="row mb-3 py-3">
                                          <div className="col-md-12">
                                            <div className="row">
                                              <div className="col-lg-8 item-des">
                                                <p className="search-list-product-name">
                                                  {item.description}
                                                </p>
                                                <p className="search-list-product-name">
                                                  color:{" "}
                                                  <span className="text-capitalize">
                                                    {item.color}
                                                  </span>
                                                </p>
                                                <p className="search-list-product-name">
                                                  size: {item.size}
                                                </p>
                                                <p className="search-list-product-name">
                                                  waranty: {item.warranty}
                                                </p>
                                                <p className="search-list-product-name">
                                                  #{item.sku}
                                                </p>
                                                <p className="cross-text">
                                                  {/* <strike className="doller-cross">$499</strike> */}
                                                  <span className="live-price">
                                                    $
                                                    {Number(
                                                      item.price
                                                    ).toLocaleString()}{" "}
                                                    x {item.qty}
                                                  </span>
                                                </p>
                                              </div>
                                              <div className="col-lg-4 OpenorderCancelBtn">
                                                {/* <a> */}
                                                <a
                                                  href={`/TrackOrder/${order.awb_code}`}
                                                >
                                                  <button className="proceed-checkout-btn bg-dark text-white AllOrderTrackBtn px-2">
                                                    Track Order
                                                  </button>
                                                </a>
                                                <button
                                                  className="cancel-order-btn mt-3"
                                                  onClick={() => {
                                                    setShow(true);
                                                    setOrder(order);
                                                  }}
                                                >
                                                  Cancel Order
                                                </button>
                                                {/* </a> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span key="01"></span>
                        )
                      )
                    ) : (
                      <Col md={12} className="noOrders">
                        <Message variant="danger">
                          Currently any order is not open
                        </Message>
                      </Col>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="Completed_Order" title="Completed Order">
                  <div className="row clr-000 mt-3">
                    <div className="col-12"></div>
                    {orders && orders.length > 0 ? (
                      orders.map((order, index) =>
                        order.isDelivered == true &&
                        order.isCancelled == false ? (
                          <div className="col-12 my-8" key={order._id}>
                            <div className="order-placed-header">
                              <div className="row">
                                <div className="col-md-3">
                                  <p className="mb-0 order-content">
                                    ORDER COMPLETED ON{" "}
                                    <span className="order-value">
                                      {formatDate(
                                        order.updatedAt.substr(0, 10)
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div className="col-md-3">
                                  <p className="mb-0 order-content">
                                    TOTAL{" "}
                                    <span className="order-value">
                                      <b>
                                        ${" "}
                                        {Number(
                                          order.totalPrice.toFixed(2)
                                        ).toLocaleString()}
                                      </b>
                                    </span>
                                  </p>
                                </div>
                                <div className="col-md-6 text-md-right text-left">
                                  <p className="mb-0 order-content">
                                    ORDER #
                                    <span className="order-value">
                                      {order._id}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="row mt-3">
                              {order.orderItems.map((item, index) => (
                                <div className="col-md-12" key={index}>
                                  <div className="card-hover px-3">
                                    <div className="row mt-3">
                                      <div className="col-md-4 text-center align-self-center mb-5">
                                        <img
                                          src={item.image}
                                          className="w-75"
                                        />
                                      </div>
                                      <div className="col-md-8">
                                        <div className="row mb-3 py-3">
                                          <div className="col-md-12">
                                            <div className="row">
                                              <div className="col-lg-8 item-des">
                                                <p className="search-list-product-name">
                                                  {item.description}
                                                </p>
                                                <p className="search-list-product-name">
                                                  #{item.sku}
                                                </p>
                                                <p className="search-list-product-name">
                                                  waranty: {item.warranty}
                                                </p>
                                                <p className="cross-text">
                                                  {/* <strike className="doller-cross">$499</strike> */}
                                                  <span className="live-price">
                                                    $
                                                    {Number(
                                                      item.price
                                                    ).toLocaleString()}{" "}
                                                    x {item.qty}
                                                  </span>
                                                </p>
                                                {order.isReturned == true && (
                                                  <p className="text-danger">
                                                    Returned
                                                  </p>
                                                )}
                                              </div>
                                              <div className="col-lg-4 compltOrderAgainBtn">
                                                <a>
                                                  <button
                                                    className="proceed-checkout-btn"
                                                    onClick={() =>
                                                      addToCartHandler(item)
                                                    }
                                                  >
                                                    Order Again
                                                  </button>
                                                </a>
                                                {/* <a href="/TrackOrder">
                                                      <button className="track-order-btn">
                                                        Track Order
                                                      </button>
                                                    </a> */}
                                                <a
                                                  href={`/writeReview/${order._id}/${item.product}`}
                                                >
                                                  <button className="proceed-checkout-btn bg-success text-white my-3 track-order-btn compltOrderReviewBtn">
                                                    Review
                                                  </button>
                                                </a>
                                                {order.isReturned == true && (
                                                  <button
                                                    className="diabled bg-danger text-white proceed-checkout-btn"
                                                    // onClick={() => {
                                                    //   setReturnShow(true);
                                                    //   setOrder(order);
                                                    // }}
                                                  >
                                                    Returned
                                                  </button>
                                                )}
                                                {order.isReturned == false && (
                                                  <button
                                                    className="proceed-checkout-btn bg-dark text-white"
                                                    onClick={() => {
                                                      setReturnShow(true);
                                                      setOrder(order);
                                                    }}
                                                  >
                                                    Return Order
                                                  </button>
                                                )}
                                              </div>
                                              {/* <div className="col-lg-4"> */}
                                              {/* <a href="/TrackOrder"> */}

                                              {/* </a> */}
                                              {/* </div> */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <span></span>
                        )
                      )
                    ) : (
                      <Col md={12} className="noOrders">
                        <Message variant="danger">
                          No order has been completed yet
                        </Message>
                      </Col>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="Cancelled_order" title="Cancelled Order">
                  <div className="row clr-000 mt-3">
                    <div className="col-12">
                      {orders && orders.length > 0 ? (
                        orders.map(order =>
                          order.isCancelled == true ? (
                            <div className="col-12 my-8" key={order._id}>
                              <div className="order-placed-header">
                                <div className="row">
                                  <div className="col-md-3">
                                    <p className="mb-0 order-content">
                                      ORDER CANCELLED ON{" "}
                                      <span className="order-value">
                                        {formatDate(
                                          order.updatedAt.substr(0, 10)
                                        )}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-md-3">
                                    <p className="mb-0 order-content">
                                      TOTAL{" "}
                                      <span className="order-value">
                                        <b>
                                          ${" "}
                                          {Number(
                                            order.totalPrice.toFixed(2)
                                          ).toLocaleString()}
                                        </b>
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-md-6 text-md-right text-left">
                                    <p className="mb-0 order-content">
                                      ORDER #
                                      <span className="order-value">
                                        {order._id}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="row mt-3">
                                {order.orderItems.map((item, index) => (
                                  <div className="col-md-12" key={index}>
                                    <div className="card-hover px-3">
                                      <div className="row mt-3">
                                        <div className="col-md-4 text-center align-self-center mb-5">
                                          <img
                                            src={item.image}
                                            className="w-75"
                                          />
                                        </div>
                                        <div className="col-md-8">
                                          <div className="row mb-3 py-3">
                                            <div className="col-md-12">
                                              <div className="row">
                                                <div className="col-lg-8 item-des">
                                                  <p className="search-list-product-name">
                                                    {item.description}
                                                  </p>
                                                  <p className="search-list-product-name">
                                                    #{item.sku}
                                                  </p>
                                                  <p className="cross-text">
                                                    {/* <strike className="doller-cross">$499</strike> */}
                                                    <span className="live-price">
                                                      $
                                                      {Number(
                                                        item.price
                                                      ).toLocaleString()}{" "}
                                                      x {item.qty}
                                                    </span>
                                                  </p>
                                                </div>
                                                <div className="col-lg-4 cancelledOrderNowBtn">
                                                  <a>
                                                    <button
                                                      className="proceed-checkout-btn"
                                                      onClick={() =>
                                                        addToCartHandler(item)
                                                      }
                                                    >
                                                      Order Now
                                                    </button>
                                                  </a>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <span key="012"></span>
                          )
                        )
                      ) : (
                        <Col md={12} className="noOrders">
                          <Message variant="danger">
                            No order has been canceled yet
                          </Message>
                        </Col>
                      )}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={showModal}
        onHide={handleClose}
        className="login-modal-main"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="login-modal-popup">
          <div className="container">
            <div className="row h-100">
              <div className="col-md-4 login-bg-color">
                <div className="pl-3 mobile-page-loginpopup">
                  <div className="login-text">
                    <h1 className="login-heading">Cancel Order</h1>
                    <span className="login-heading-content1 pr-3">
                      Benefit of creation an account
                    </span>
                    <div className="mt-4">
                      <p className="login-heading-content2">
                        - Checkout faster
                      </p>
                      <p className="login-heading-content2">
                        - Store multiple address
                      </p>
                      <p className="login-heading-content2">- Track order</p>
                    </div>
                  </div>
                  <div className="login-img-div">
                    <img src="/images/Login.svg" className="login-img" />
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-3">
                {/* <Form onSubmit={submitHandler}> */}
                <div className="login-form-maindiv pl-2">
                  <div className="login-form pt-3">
                    <div>
                      <>
                        <input
                          type="radio"
                          value="Option1"
                          name="reason"
                          onChange={() => setReason("Option1")}
                        />
                        {" Option1"}
                        <br />
                        <br />
                        {/* <p>Option1</p> */}
                        <input
                          type="radio"
                          value="Option2"
                          name="reason"
                          onChange={() => setReason("Option1")}
                        />
                        {" Option2"}
                        <br />
                        <br />

                        {/* <p>Option2</p> */}
                        <input type="radio" value="Option3" name="reason" />
                        {" Option3"}
                        <br />
                        <br />

                        {/* <p>Option1</p> */}
                        <input
                          type="radio"
                          value="Option4"
                          name="reason"
                          onChange={() => setReason("Option1")}
                        />
                        {" Option4"}
                        <br />
                        <br />
                      </>
                    </div>
                    {/* <div className="row">
                        <p>Option 4</p>
                      </div> */}
                    <div className="row">
                      <span className="mx-3">Other:</span>
                      <textarea
                        className="mb-4"
                        placeholder="Your Reason"
                        onChange={() => setReason("Option1")}
                      ></textarea>
                    </div>
                    <div className="row">
                      <button
                        className="login-btn"
                        onClick={e => {
                          cancelCurrentOrder(order);
                        }}
                      >
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
                {/* </Form> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        show={showReturnModal}
        onHide={handleReturnClose}
        className="login-modal-main"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="login-modal-popup">
          <div className="container">
            <div className="row h-100">
              <div className="col-md-4 login-bg-color">
                <div className="pl-3 mobile-page-loginpopup">
                  <div className="login-text">
                    <h3 className="login-heading">Return Order</h3>
                  </div>
                  <div className="login-img-div">
                    {/* <img src="./images/Login.svg" className="login-img" /> */}
                  </div>
                </div>
              </div>
              <div className="col-md-8 mt-3">
                {/* <Form onSubmit={submitHandler}> */}
                <div className="login-form-maindiv pl-2">
                  <div className="login-form pt-3">
                    <div>
                      <>
                        <p>Reason : </p>
                        {/* <input
                            type="text"
                            name="reason"
                            className="form-control mb-3"
                            onChange={e => setReason(e.target.value)}
                          />{" "} */}
                        <textarea
                          className="mb-4"
                          placeholder="Your Reason"
                          rows="4"
                          cols="50"
                          // onChange={() => setReason("Option1")}
                          onChange={e => setReason(e.target.value)}
                        ></textarea>
                      </>
                    </div>

                    {/* <div>
                        <div className="flex justify-center sm:justify-start flex-wrap -mx-8">
                          <label
                            htmlFor="button-file"
                            className={clsx(
                              classes.productImageUpload,
                              "flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer shadow hover:shadow-lg"
                            )}
                          >
                            <input
                              accept="image/*"
                              className="hidden"
                              id="button-file"
                              type="file"
                              onChange={handleUploadChange}
                            />
                            <Icon fontSize="large" color="action">
                              cloud_upload
                            </Icon>
                          </label>
                          {form.image && (
                            <div
                              role="button"
                              tabIndex={0}
                              className={clsx(
                                classes.productImageItem,
                                "flex items-center justify-center relative w-128 h-128 rounded-8 mx-8 mb-16 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg"
                              )}
                            >
                              <img
                                className="max-w-none w-auto h-full"
                                src={form.image}
                                alt="products"
                              />
                            </div>
                          )}
                        </div>
                      </div> */}

                    <div className="row pl-3">
                      <button
                        className="login-btn"
                        onClick={e => {
                          returnCurrentOrder(order);
                        }}
                      >
                        Return Order
                      </button>
                    </div>
                  </div>
                </div>
                {/* </Form> */}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AllOrders;
