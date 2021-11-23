import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderWhite from "../components/HeaderWhite";
import { login } from "../actions/userActions";
import { getWishList } from "../actions/productActions";
import { listMyWOlfpackOrders, addWhishList } from "../actions/userActions";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { listMyOrders, cancelOrder, payOrder } from "../actions/orderActions";
import axios from "axios";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Modal
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { orderPayment, createOrder } from "../actions/orderActions";
import { listStates, homeStatesList } from "../actions/stateActions";
import { Link } from "react-router-dom";
const Cart = ({ match, history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const coupondata = useSelector(state => state.couponDetails);
  const [wish, setWish] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [showRegisterModal, setRegisterShow] = useState(false);
  const handleRegisterClose = () => setRegisterShow(false);

  const [coupon, setCoupon] = useState("");
  const { cartItems } = cart;
  const selected = cartItems?.map(data =>
    data.select ? data.select : "no item"
  );
  const wolfpackOrderList = useSelector(state => state.wolfpackOrderList);
  const wolfPackOrder = wolfpackOrderList?.orders?.length > 0;

  var cartPrice = cartItems?.reduce(
    (acc, item) => (item.select ? acc + item.qty * item.discount_price : acc),
    0
  );
  cartPrice = Math.round(cartPrice);

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  let [userId] = useState(userInfo && userInfo._id ? userInfo._id : "");
  console.log(
    process.env.SHIPROCKET_EMAIL,
    process.env.REACT_APP_RAZORPAY_KEY,
    "process.env.SHIPROCKET_EMAIL"
  );

  const stateList = useSelector(state => state.stateList);
  const [success, setSuccess] = useState(false);

  var transactionId;
  const orderCreate = useSelector(state => state.orderCreate);
  const { order } = orderCreate;
  const orderId = order?.data?._id;
  let payable_amount;

  const [shippingCharges, setShippingCharges] = useState(null);
  const [zipCode] = useState();
  const [sendAsGift, setSendAsGift] = useState("");

  const [productIds, setProductId] = useState("");
  cartPrice = cartItems.reduce(
    (acc, item) => (item.select ? acc + item.qty * item.discount_price : acc),
    0
  );
  var cartPriceOnly = cartItems
    ?.reduce(
      (acc, item) => (item.select ? acc + item.qty * item.discount_price : acc),
      0
    )
    .toFixed(1);

  const [total_price, setTotal_price] = useState(cartPrice);
  var discount;
  if (coupondata?.order?.weightage && coupondata?.order?.active === true) {
    if (coupondata?.order?.coupon_type === "AMOUNT") {
      discount = coupondata?.order?.weightage * 1;
    } else {
      discount = (cartPrice * coupondata?.order?.weightage) / 100;
    }
    cartPrice = (cartPrice - discount).toFixed(1);
  }
  if (giftMessage) {
    cartPrice = cartPrice * 1 + 25;
  }
  useEffect(() => {
    setTotal_price(cartPrice);
  }, [cartPrice]);
  var shippingCharge = cartItems[cartItems.length - 1]?.shippingCharges
    ? cartItems[cartItems.length - 1]?.shippingCharges
    : 0;
  var taxCharge = cartItems[cartItems.length - 1]?.tax
    ? cartItems[cartItems.length - 1]?.tax
    : 1;
  var couponType = cartItems[cartItems.length - 1]?.coupon_type;

  const placeOrder = (e, payable_amount) => {
    e.preventDefault();
    localStorage.setItem("payable_amount", JSON.stringify(payable_amount));
    window.open("/payment", "_self");
    // displayRazorpay(payable_amount);
  };

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
      data.select === true ? selectedItem.push(data) : "no item"
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

  useEffect(() => {
    if (userId) {
      dispatch(getWishList(userId));
    }
  }, [dispatch, userId]);
  useEffect(
    his => {
      dispatch(listMyWOlfpackOrders());
    },
    [dispatch]
  );

  useEffect(() => {
    if (orderId) {
      history.push(`/orderConfirmation/${orderId}`);
    }
  }, [history, orderId]);

  const removeFromCartHandler = (prodId, pSize) => {
    const index = cartItems.findIndex(
      item => item.product === prodId && item.size === pSize
    );
    let products = [...cartItems];
    products.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(products));
    dispatch(removeFromCart({ prodId, pSize }));
    if (products.length === 0) window.scrollTo(0, 0);
  };

  const applyCoupon = coupon => {
    setCoupon(coupon);
    dispatch(
      addToCart("", 1, "", "", "", "", zipCode, shippingCharges, coupon)
    );
  };

  const proDetail = useSelector(state => state.productDetails);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [qnty, setQty] = useState("");
  const [showMore, setShowMore] = useState("");

  const handleSize = (e, id, color, qnty, select) => {
    setSize(e.target.value);
    setQty(qnty);
    setColor(color);
  };

  const handleQuantity = (e, id, size, color, select) => {
    setQty(e.target.value);
    setColor(color);
    setSize(size);
    dispatch(addToCart(id, e.target.value, color, size, select, "", "", ""));
  };

  const handleColor = (e, id, qnty, size, select) => {
    setColor(e.target.value);
    setSize(size);
    setQty(qnty);
  };

  const handleCheck = (e, id, color, size, qnty) => {
    setQty(qnty);
    setColor(color);
    let select;
    if (e.target.checked) {
      select = true;
    } else {
      select = false;
    }
    dispatch(addToCart(id, qnty, color, size, select, "", "", ""));
  };

  const addToWhishList = productId1 => {
    setProductId(productId1);
    if (!userInfo) {
      setWish(true);
      dispatch(login(true));
    } else {
      dispatch(addWhishList({ userId, productId1 }));
    }
  };

  const sendGiftHandler = () => {
    setSendAsGift(giftMessage);
    setShowMsg(false);
  };

  const showGiftHandler = () => {
    setShowMsg(true);
  };

  const joinWolfPack = () => {
    history.push("/wolfpack");
  };

  const showMoreHandler = () => {
    if (!showMore) setShowMore(true);
    else setShowMore(false);
  };

  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item href="/cart">my cart</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-3">
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col-md-12 text-center">
              <div>
                <img
                  src={"/images/sign-bag-red.png"}
                  alt=" "
                  className="home-location active"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/home-location-green.png"}
                  alt=" "
                  className="home-location"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/sign_rs-green.png"}
                  alt=" "
                  className="home-location"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 offset-md-8 pl-4">
              <div className="shield-li-div right-content">
                <ul className="list-group list-group-horizontal shield-li">
                  <li className="list-group-item">
                    <img
                      src={"/images/shield.png"}
                      alt=" "
                      className="shield-img"
                    />
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
          {cartItems.length > 0 ? (
            <>
              <div className="row pt-5 pb-3">
                <div className="col-md-8">
                  <div className="row brdr-form py-3">
                    <div className="col-md-9">
                      <p className="clr-black mb-0">available offers</p>
                      <ul className="minus-symbol-ul payment-ul-block mb-0">
                        <li>
                          Bank offer 5% unlimited cashback on flipcart Axis Bank
                          Credit Card T&C
                        </li>
                        <li>
                          Bank Offer 10% of an SBIMastercard Debit card first
                          time transiction. T&C
                        </li>
                        {showMore && (
                          <li>
                            Bank offer 10% unlimited cashback on flipcart Axis
                            Bank Credit Card T&C
                          </li>
                        )}
                      </ul>
                      {!showMore ? (
                        <p className="mb-0 show-more-link">
                          <a onClick={showMoreHandler} className="text-pink">
                            <span></span> show more
                          </a>
                        </p>
                      ) : (
                        <p className="mb-0 show-less-link">
                          <a onClick={showMoreHandler} className="text-pink">
                            <span></span> show less
                          </a>
                        </p>
                      )}
                    </div>
                    <div className="col-md-3"></div>
                  </div>
                </div>

                <div className="col-md-4 pl-4 wolfpack-section">
                  <div className="h-100">
                    <div className="subscription-div text-white text-center px-2 h-100">
                      <p className="mb-0 save-upto pt-3 pb-1">
                        save upto{" "}
                        <b>
                          &#8377; <span>100</span>
                        </b>{" "}
                        on this order
                      </p>
                      <p className="mb-0 join-wolf-txt">
                        join{" "}
                        <a href="/wolfpack">
                          <b>WolfPack</b>
                        </a>{" "}
                        for
                      </p>
                      <div className="cntr pt-2 pb-2 ">
                        <div className="d-inline-block pr-3">
                          <label htmlFor="opt1" className="mb-0 nav-radio">
                            <input
                              type="radio"
                              name="rdo"
                              id="opt1"
                              className="nav-radio-btn"
                              onClick={joinWolfPack}
                            />
                            <span className="label">
                              &#8377; 299 (6 months)
                            </span>
                          </label>
                        </div>
                        <div className="d-inline-block">
                          <label htmlFor="opt2" className="mb-0 nav-radio">
                            <input
                              type="radio"
                              name="rdo"
                              id="opt2"
                              className="nav-radio-btn"
                              onClick={joinWolfPack}
                            />
                            <span className="label">
                              &#8377; 499 (12 months)
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-0 pb-3">
                <div className="col-md-8 shop-for">
                  <div className="row">
                    <div className="col-12">
                      <p className="font-gtm-light fw-600">
                        <img src={"./images/truck.png"} className="mr-2" />
                        shop for <span className="text-pink">&#8377; 230 </span>
                        more to avoid{" "}
                        <span className="con-fee-txt clr-black">
                          convenience fee.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 pl-md-0">
                      <p className="mb-1 clr-black fs-16">
                        items (<span>{cartItems.length}</span>)
                        <span className="mb-1 clr-black fs-16 float-right">
                          total payable :{" "}
                          <span>
                            &#8377;{" "}
                            {wolfPackOrder
                              ? Number(total_price - 100).toFixed(2)
                              : Number(total_price).toFixed(2)}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row brdr-form pt-4 product-detail">
                    <div className="col-md-12 product-image">
                      {cartItems.map((item, index) => {
                        return (
                          <div className="row mb-4" key={index + item.product}>
                            <div className="col-md-3 text-center">
                              <div className="bg-white h-100 product-image">
                                <a href={"productdetail/" + item.slug}>
                                  <img
                                    src={item.image}
                                    alt=" "
                                    className="order-summary-bags-img"
                                  />
                                </a>
                                <label className="chkbox-lbl green-checkbox">
                                  <input
                                    type="checkbox"
                                    onChange={e =>
                                      handleCheck(
                                        e,
                                        item.slug,
                                        item.color,
                                        item.size,
                                        item.qty
                                      )
                                    }
                                    value={true}
                                    checked={item.select ? true : false}
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              </div>
                            </div>
                            <div className="col-md-9 font-gtm-light clr-black pl-0 product-des">
                              <div className="row no-gutters">
                                <div className="col-9 py-2">
                                  <span>
                                    <a href={"productdetail/" + item.slug}>
                                      <p className="font-gtm-medium fs-16">
                                        {item.name}
                                      </p>
                                      <p className="mb-0 fs-16 one-line-ellipse line-height1">
                                        {item.description}
                                      </p>
                                    </a>
                                  </span>
                                  <div className="cus-min-max-dropdown py-3 quatColorSize">
                                    <select
                                      className="text-uppercase mr-3 cstm-select"
                                      onChange={e =>
                                        handleSize(
                                          e,
                                          item.slug,
                                          item.color,
                                          item.qty,
                                          item.select
                                        )
                                      }
                                      defaultValue={item.size}
                                    >
                                      <option value={item?.size} disabled>
                                        Size: {item?.size ? item.size : ""}
                                      </option>
                                      {item?.sizes?.map((size, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={size.title}
                                          >
                                            Size: {size.title}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <select
                                      className="text-uppercase mr-3 cstm-select"
                                      onChange={e =>
                                        handleColor(
                                          e,
                                          item.slug,
                                          item.qty,
                                          item.size,
                                          item.select
                                        )
                                      }
                                      defaultValue={item.color}
                                    >
                                      <option value={item?.color} disabled>
                                        {item?.color ? item.color : "COLOR"}
                                      </option>
                                      {item?.colors?.map((color, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={color.title}
                                          >
                                            {" "}
                                            {color.title}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    <select
                                      id="order-summary-dropdown-button2"
                                      size="sm"
                                      title="qty: 1"
                                      onChange={e =>
                                        handleQuantity(
                                          e,
                                          item.slug,
                                          item.size,
                                          item.color,
                                          item.select
                                        )
                                      }
                                      className="text-uppercase cstm-select mr-3"
                                      defaultValue={item?.qty}
                                    >
                                      <option value="1">Qty: 1</option>
                                      <option value="2">Qty: 2</option>
                                      <option value="3">Qty: 3</option>
                                      <option value="4">Qty: 4</option>
                                    </select>
                                  </div>
                                  <p className="mb-0 pt-2 no-focus quatColorSize">
                                    <button
                                      className="shoppimg-cart-remove removewish cstm-select2 mr-3"
                                      onClick={() =>
                                        removeFromCartHandler(
                                          item.product,
                                          item.size
                                        )
                                      }
                                    >
                                      <img
                                        src={"./images/delete-red.png"}
                                        alt=" "
                                        className="mr-2"
                                      />
                                      remove
                                    </button>
                                    <a
                                      onClick={() =>
                                        addToWhishList(item.product)
                                      }
                                      className="shopping-cart-remove-bluetxt mt-3 removewish"
                                    >
                                      <button className="shoppimg-cart-remove cstm-select2">
                                        Add To wishlist
                                      </button>
                                    </a>
                                  </p>
                                </div>

                                <div className="col-3 py-2 text-right">
                                  <p className="mb-1 font-gtm-medium fs-16">
                                    &#8377;
                                    {Number(item.discount_price).toFixed(2)}
                                  </p>
                                  <p className="mb-0 line-height1">
                                    <span className="strike-rs">
                                      <s>&#8377;{item.price}</s>{" "}
                                    </span>
                                    <span className="off-percent">
                                      (
                                      {Math.round(
                                        ((item?.price - item?.discount_price) *
                                          100) /
                                          item?.price
                                      )}
                                      % off)
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 pl-4 pt-4 coupons">
                  <div className="pt-1">
                    <div className="brdr-form px-3">
                      <p className="mb-0 clr-black fs-16 py-2">coupons</p>
                      <p className="text-center coupan-div-inner mb-0 pt-3 pb-4">
                        <img src={"./images/percent-tag.png"} />
                        {!coupondata?.order?.total ? (
                          <>
                            <span>Apply coupon</span>

                            <input
                              type="text"
                              className="form-control login-input-box my-4"
                              placeholder="Enter Discount Code"
                              id="discountcode"
                              onChange={e => {
                                setCoupon(e.target.value);
                              }}
                            />
                            <a
                              onClick={() => {
                                applyCoupon(coupon);
                              }}
                              className="addnew-address-btn all-event1 brder-lr-pink edgtf-btn edgtf-btn-gapped_outline"
                            >
                              <span className="edgtf-btn-text text-pink">
                                apply
                              </span>
                              <span
                                className="edgtf-gapped-border edgtf-gapped-border-top"
                                style={{
                                  background:
                                    "linear-gradient(to right, rgb(234 71 105) 0%, rgb(234 71 105) 85%, transparent 85%, transparent 89%, rgb(234 71 105) 89%, rgb(234 71 105) 100%)"
                                }}
                              ></span>
                              <span
                                className="edgtf-gapped-border edgtf-gapped-border-bottom"
                                style={{
                                  background:
                                    "linear-gradient(to right, rgb(234 71 105) 0%, rgb(234 71 105) 15%, transparent 15%, transparent 19%, rgb(234 71 105) 19%, rgb(234 71 105) 100%)"
                                }}
                              ></span>
                            </a>
                          </>
                        ) : (
                          <span>Coupon Applied</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="row sendGift">
                    <div className="col-md-12 text-center pt-4 cart-send-gift px-3 py-3 sendGift1">
                      <p className="text-white mb-0 snd-gift1">send as gift</p>
                      <p className="mb-0 clr-black font-gtm-light snd-gift2 px-lg-4">
                        gift wrap and personalised message on card, Only for
                        &#8377; 25
                      </p>
                      <p className="mb-0 snd-gift3">
                        <a
                          onClick={showGiftHandler}
                          className="hover-no-decoration text-pink fs-16 fw-600 font-gtm-medium"
                        >
                          {sendAsGift ? "added gift wrap" : "add gift wrap"}
                        </a>
                        {showMsg && (
                          <>
                            <input
                              type="text"
                              id="discountcode"
                              className="form-control login-input-box"
                              placeholder="enter pincode"
                              onChange={e => {
                                setGiftMessage(e.target.value);
                              }}
                            ></input>
                            <button className="mt-2" onClick={sendGiftHandler}>
                              send
                            </button>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-md-12 priceDetail">
                      <p className="clr-black fs-16 pt-4 mb-0 pb-2">
                        price details ({cartItems.length} items)
                      </p>
                      <div className="row no-gutters pb-1">
                        <div className="col-md-12">
                          <p className="mb-0 price-details-text">
                            total MRP{" "}
                            <span className="mb-0 price-details-text float-right">
                              &#8377; {cartPriceOnly}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="row no-gutters pb-1">
                        <div className="col-md-12">
                          <p className="mb-0 price-details-text">
                            convenience fee
                            <a href="" className="know-more-link">
                              know more
                            </a>
                            <span className="mb-0 price-details-text float-right">
                              &#8377; 0
                            </span>
                          </p>
                        </div>
                      </div>
                      {sendAsGift ? (
                        <div className="row no-gutters pb-1">
                          <div className="col-md-12">
                            <p className="mb-0 price-details-text">
                              send gift
                              <span className="mb-0 price-details-text float-right">
                                + &#8377; 25
                              </span>
                            </p>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div className="row no-gutters pb-1">
                        <div className="col-md-12">
                          <p className="mb-0 price-details-text">
                            coupon discount
                            <span className="mb-0 price-details-text float-right">
                              {discount ? "-" : ""} &#8377;{" "}
                              {discount ? discount : 0}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="row no-gutters pb-1">
                        <div className="col-md-12">
                          <p className="mb-0 price-details-text">
                            wolfpack
                            <span className="mb-0 price-details-text float-right">
                              {wolfPackOrder ? (
                                <span>
                                  {"-"} &#8377; {"100"}
                                </span>
                              ) : (
                                <span>&#8377; {"0"}</span>
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="row no-gutters pb-1">
                        <div className="col-md-12">
                          <p className="mb-0 price-details-text">
                            total payable amount
                            <span className="mb-0 clr-black fs-24 font-gtm-medium float-right">
                              &#8377;{" "}
                              <span className="fw-600">
                                {wolfPackOrder
                                  ? Number(total_price - 100).toFixed(2)
                                  : Number(total_price).toFixed(2)}
                              </span>
                            </span>
                          </p>
                          <p className="mb-0 your-saving-rs-text">
                            (you are saving &#8377;
                            <span>
                              {cartPriceOnly -
                                (wolfPackOrder
                                  ? Number(total_price - 100).toFixed(2)
                                  : Number(total_price).toFixed(2))}
                            </span>
                            )
                          </p>
                        </div>
                      </div>
                      <div className="py-3 placeOrderButton">
                        <span className="d-none">
                          {wolfPackOrder
                            ? (payable_amount = Number(
                                total_price - 100
                              ).toFixed(2))
                            : (payable_amount = Number(total_price).toFixed(2))}
                        </span>
                        <Link
                          //   href=""
                          className="place-order-btn d-block text-center placeOrderButton"
                          onClick={e => placeOrder(e, payable_amount)}
                        >
                          place order
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <Modal
                  size="lg"
                  show={showRegisterModal}
                  onHide={handleRegisterClose}
                  className="login-modal-main"
                >
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body className="login-modal-popup">
                    <div className="container">
                      <div className="row h-100">
                        <div className="col-md-12 col-lg-12 popup_message">
                          <div className="login-text">
                            <h3>Order Confirmation</h3>
                          </div>
                          <div className="order_confirm pt-4">
                            <h5 className="confirm_message">
                              <i
                                class="fa fa-check-circle"
                                aria-hidden="true"
                              ></i>
                              Your Order Is Confirmed
                            </h5>
                            <p>
                              Thanks for shopping! we'd like to inform you that
                              Boombolt recieved your order and is preparing it
                              for shipment
                            </p>
                            <p></p>
                            <div className="row">
                              <div className="col-4">
                                <a href="/">
                                  <button className="proceed-checkout-btn">
                                    Back To Home
                                  </button>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>
            </>
          ) : (
            <div>
              <h4>Shopping Cart Is Empty</h4>
              <hr />
              <button
                className="shoppimg-cart-continue-shoppingbtn my-5"
                onClick={e => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Cart;
