import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-grid-carousel";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ScrollAnimation from "react-animate-on-scroll";
import HeaderWhite from "../components/HeaderWhite";
import { listStates, homeStatesList } from "../actions/stateActions";
import { listProductDetails } from "../actions/productActions";
import { addWhishList } from "../actions/userActions";
import { getWishList, removeWish } from "../actions/productActions";

import { login } from "../actions/userActions";
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
import {
  addToCart,
  addToCartFromCart,
  removeFromCart,
  CheckCoupon,
  getCoupon
} from "../actions/cartActions";

const ProductDetail = ({ match, history }) => {
  const proId = match.params.slug;

  const taxListZipcode = useSelector(state => state.homeStateList);
  const [zipCode, setZipCode] = useState();
  const [zipCodeError, setZipCodeError] = useState(false);
  const { homeStatesListing } = taxListZipcode;
  const cart = useSelector(state => state.cart);

  const [cartItems, setCartItems] = useState(cart?.cartItems);

  const wishList = useSelector(state => state.wishList);
  const [wishlistItems, setWishListItems] = useState(wishList?.wishlistItems);
  const [qnty, setQty] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [clr, setColor] = useState("");
  const [size, setSize] = useState("");
  // const [border, setSize] = useState("");
  const [isActive, setActive] = useState(false);

  const handleColorChange = (e, color) => {
    setColor(color);
    // setActive(!isActive)
    // e.target.className="btn clr-select2 active-border";

    //  clr.className="btn clr-select2 active-border"
  };
  const handleSizeChange = (e, sizeitem) => {
    // alert(sizeitem)
    setSize(sizeitem);
    // e.target.className="btn clr-select2 active-border";
  };
  const [productId, setProductId] = useState("");
  const [wish, setWish] = useState(false);

  const proDetail = useSelector(state => state.productDetails);
  const { product } = proDetail;
  const productId1 = product?._id;

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const log = useSelector(state => state.showLogin);

  let [userId, setUserId] = useState(
    userInfo && userInfo._id ? userInfo._id : ""
  );
  let addressData = JSON.parse(localStorage.getItem("selectedAddress"));
  const [totalrating, setTotalrating] = useState(0);
  const [ratingOne, setratingOne] = useState(0);
  const [ratingTwo, setratingTwo] = useState(0);
  const [ratingThree, setratingThree] = useState(0);
  const [ratingFour, setratingFour] = useState(0);
  const [ratingFive, setratingFive] = useState(0);
  useEffect(() => {
    if (product?.reviews?.length > 0) {
      // product?.reviews?.map(review => {
      var tr = 0;
      for (var i = 0; i < product?.reviews?.length; i++) {
        tr = tr + product?.reviews[i].rating;

        if (product?.reviews[i].rating == 1) setratingOne(ratingOne + 1);
        if (product?.reviews[i].rating == 2) setratingTwo(ratingTwo + 1);
        if (product?.reviews[i].rating == 3) setratingThree(ratingThree + 1);
        if (product?.reviews[i].rating == 4) setratingFour(ratingFour + 1);
        if (product?.reviews[i].rating == 5) setratingFive(ratingFive + 1);
      }
      setTotalrating(tr);
    }
  }, [product]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (proId) {
      dispatch(listProductDetails(proId));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(listStates());
    // dispatch(listTaxes());
  }, [dispatch]);
  const addToCartHandler = () => {
    if (product?.colors.length && (clr == "" || clr == null)) {
      alert("Please select Color");
    } else if (product?.size.length && (size == "" || size == null)) {
      alert("Please select Size");
    } else {
      // dispatch(getCoupon());
      if (proId && coupon) {
        dispatch(
          addToCart(proId, qnty, clr, size, true, "", zipCode, "", coupon)
        );
      } else if (proId && !coupon) {
        dispatch(
          addToCart(proId, qnty, clr, size, true, "", zipCode, "", "")
        );
      }
    }
  };
  const sendAsGiftHandler = () => {
    // dispatch(getCoupon());
    if (proId && coupon) {
      dispatch(
        addToCart(proId, qnty, clr, size, true, "", zipCode, "", coupon)
      ).then(history.push("/cart"));
    } else if (proId && !coupon) {
      dispatch(addToCart(proId, qnty, clr, size, true, "", zipCode, "")).then(
        history.push("/cart")
      );
    }
    // history.push("/cart");
  };
  useEffect(() => {
    if (log.products.payload == false && wish == true) {
      if (userLogin?.userInfo) {
        userId = userLogin?.userInfo?._id;
        dispatch(addWhishList({ userId, productId1 }));
      }
    }
  }, [userInfo]);

  const removeToWhishList = productId1 => {
    setProductId(productId1);
    dispatch(removeWish(productId1, userId));
  };

  const addToWishList = proid => {
    setProductId(productId1);
    if (!userInfo) {
      alert("Please Login to add your favorite item in your wishlist");
      setWish(true);
      // dispatch(login(true));
      history.push("/login");
    } else {
      dispatch(addWhishList({ userId, productId1 }));
    }
  };
  useEffect(() => {
    if (userId) {
      dispatch(getWishList(userId));
    }
  }, [dispatch]);

  function checkTax(zipCode) {
    var zipLen = zipCode?.toString().length;
    if (zipLen < 6) {
      setZipCode(zipCode);
      dispatch(homeStatesList(zipCode));
    }
    if (zipLen == 5) {
      dispatch(homeStatesList(zipCode));
    }
  }
  const handleQuantity = val => {
    if (val == "add") setQty(qnty + 1);
    else {
      if (qnty > 1) setQty(qnty - 1);
    }
  };
  const changeValueofQnty = () => { };

  useEffect(() => {
    if (homeStatesListing) {
      setZipCodeError(false);
    } else {
      if (zipCode) {
        setZipCodeError(true);
      }
    }
  }, [homeStatesListing]);
  const options = {
    settings: {},

    buttons: {},
    thumbnails: {},
    progressBar: {}
  };
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container-fluid px-md-5 px-3">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item href={"/productdetail/" + product?.slug}>
                  product detail
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">{proId}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      {product?.name && (
        <div className="background-image">
          <div className="container-fluid px-lg-5">
            <div className="row pt-md-5 pt-2 no-gutters">
              {/* left side div */}
              <div className="col-md-7">
                <SRLWrapper>768px
                  <div className="row no-gutters">
                    {product?.images?.map((image, index) => {
                      return (
                        index < 8 && (
                          <div key={index} className="col-md-6">
                            <div className="image-div-hover-link-outer mobile-px-0">
                              <div className="new-arival-ul image-div-hover-link-middle">
                                <div className="image-div-hover-link1 d-flex bg-white py-3 text-center">
                                  <a href={image}>
                                    <img
                                      className="product-detail-img"
                                      src={image}
                                      alt={index}
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      );
                    })}
                  </div>
                </SRLWrapper>
              </div>
              {/* right side div */}
              <div className="col-md-5 pl-md-4 pt-5 pt-md-0">
                <p className="mb-0 line-height1 pd-p1">{product?.name}</p>
                <p className="mb-0 pd-p2 line-height1 font-gtm-light">
                  {product?.name}
                </p>
                <p className="mb-0 pd-p3 clr-sku">
                  <span>sku: </span>
                  <span>{product?.sku}</span>
                </p>
                {product?.reviews?.length > 0 && (
                  <p className="mb-0 pd-p4 rating-p my-3">
                    <span>
                      {(product?.rating).toFixed(1)}{" "}
                      <i className="fa fa-star"></i> |{" "}
                      {product?.reviews?.length} ratings
                    </span>
                  </p>
                )}
                <p className="mb-0 mb-0 pd-p5 line-height1">
                  <span className="single-product-bag-price">
                    &#8377; <span>{product?.discount_price}</span>
                  </span>
                  &nbsp;
                  <span className="single-product-bag-strike-price">
                    <s>
                      &#8377;<span>{product?.price}</span>
                    </s>
                  </span>
                  &nbsp;
                  <span className="single-product-bag-off">
                    (
                    {Math.round(
                    ((product?.price - product?.discount_price) * 100) /
                    product?.price
                  )}
                    % off)
                  </span>
                </p>
                <p className="mb-0 pd-p6 clr-sku">inclusive of all Tax.</p>
                <p className="mb-0 pd-p7">
                  {/* Axle is not your regular backpack. It's a tank, It can take care
                off world around you. In it's full capacity. It's a 32 litre
                backpack with more than enough space to carry overnight stuff. */}
                  {product?.description}
                </p>
                {product?.colors.length > 0 &&
                  <div className="mt-2">
                    <p className="mb-0 pd-p8 clr-sku text-capitalize">Color</p>
                    <ScrollAnimation
                      className="filter-brdr-img"
                      animateIn="fadeIn"
                      duration={2}
                      animateOnce={true}
                    >
                      <img src={"../images/border-black.png"} />
                    </ScrollAnimation>
                    <div className="pt-1">
                      {product?.colors?.map((color, index) => {
                        return (
                          <button
                            key={index}
                            type="button"
                            // active
                            className={`btn clr-select2 ${clr == color?.title ? "active-border" : ""
                              }`}
                            style={{
                              backgroundColor: color?.colorcode
                            }}
                            value={color?.title}
                            onClick={e => handleColorChange(e, color.title)}
                          ></button>
                        );
                      })}
                    </div>
                  </div>
                }


                {product?.size.length > 0 &&
                  <div className="mt-2">

                    <p className="mb-0 pd-p8 clr-sku">Size</p>
                    <ScrollAnimation
                      className="filter-brdr-img"
                      animateIn="fadeIn"
                      duration={2}
                      animateOnce={true}
                    >
                      <img src={"../images/border-black.png"} />
                    </ScrollAnimation>
                    <div className="pt-1">
                      {product?.size?.map((sizeitem, index) => {
                        return (
                          <span
                            key={index}
                            className={` clr-select23 ${size == sizeitem.title ? "btn active-border" : ""
                              }`}
                            onClick={e => handleSizeChange(e, sizeitem.title)}
                          >
                            {sizeitem.title}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                }


                <div className="input-group item_count">
                  <input
                    type="button"
                    value="-"
                    onClick={() => handleQuantity("sub")}
                    className="button-minus"
                    data-field="quantity"
                  />
                  <input
                    type="number"
                    step="1"
                    max=""
                    value={qnty}
                    name="quantity"
                    className="quantity-field"
                    placeholder="1"
                    onChange={changeValueofQnty}
                  />
                  <input
                    type="button"
                    value="+"
                    // onClick={("add")}
                    onClick={() => handleQuantity("add")}
                    className="button-plus"
                    data-field="quantity"
                  />
                </div>
                <p className="mb-0 pd-p8 clr-sku text-capitalize">warranty</p>
                <ScrollAnimation
                  className="filter-brdr-img"
                  animateIn="fadeIn"
                  duration={2}
                  animateOnce={true}
                >
                  <img src={"../images/border-black.png"} />
                </ScrollAnimation>
                <p>{product?.waranty}</p>

                <p className="clr-sku">available offers</p>

                <ul className="minus-symbol-ul">
                  <li>
                    Bank offer 5% unlimited cashback on flipcart Axis Bank
                    Credit Card T&C
                  </li>
                  <li>No Cost EMI on flipcart Axis BankCredit Card T&C</li>
                  <li>
                    Bank Offer 10% of an SBIMastercard Debit card first time
                    transiction. T&C
                  </li>
                </ul>
                <p className="clr-sku">delivery options</p>
                <div className="pincode_check">
                  <input
                    type="text"
                    onChange={e => checkTax(e.target.value)}
                    placeholder="enter pincode"
                  ></input>
                  <button>check</button>
                  {zipCodeError && (
                    <span className="text-danger ml-2">
                      delivery not available at this pincode
                    </span>
                  )}
                  <p className="mt-3">
                    Please enter PIN code to check delivery time & Pay on
                    Delivery Availability
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-xl-6 col-12 productDetail_addToButtons">
                    <div className="position-relative pink-bg-btn">
                      <button
                        onClick={addToCartHandler}
                        className="all-event1 brder-lr-blue py-0 edgtf-btn edgtf-btn-gapped_outline d-inline-block w-100 add-to-bag-link"
                      >
                        <div className="row no-gutters">
                          <div className="col-12 text-center btn-add-to-bag">
                            <span>
                              <i className="fas fa-shopping-bag pr-2 fs-16"></i>
                            </span>
                            <span className="edgtf-btn-text text-white fs-16">
                              add to bag
                            </span>
                          </div>
                        </div>
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
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-lg-12 col-xl-6 productDetail_addToButtons">
                    <div className="position-relative1">
                      <a
                        onClick={sendAsGiftHandler}
                        className="px-0 all-event1 brder-lr-blue py-0 edgtf-btn edgtf-btn-gapped_outline d-inline-block w-100 add-to-bag-link"
                      >
                        <div className="row no-gutters">
                          <div className="col-12 text-center">
                            <span>
                              <i className="fas fa-gift pr-2 fs-16"></i>
                            </span>
                            <span className="edgtf-btn-text text-black fs-16">
                              send as gift
                            </span>
                          </div>
                        </div>
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
                <div className="row mt-3">
                  {/* <div className="col-6">
                  <div className="position-relative1">
                    <a
                      href=""
                      className="all-event1 brder-lr-blue py-0 edgtf-btn edgtf-btn-gapped_outline d-inline-block w-100 add-to-bag-link"
                    >
                      <div className="row no-gutters">
                        <div className="col-12 text-center">
                          <span className="edgtf-btn-text text-black fs-16">
                            <i className="far fa-heart pr-2 fs-16"></i>wishlist
                          </span>
                        </div>
                      </div>
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
                </div> */}
                  <div className="col-lg-12 col-xl-6 productDetail_addToButtons">
                    <div className="position-relative">
                      {wishList?.products?.findIndex(
                        prd => prd?._id === product?._id
                      ) > -1 ? (
                        // <button
                        //   title="Add to wishlist"
                        //   className="search-list-addtocart-btn"
                        //   onClick={() => removeToWhishList(product?._id)}
                        // >
                        //   <i className="fas fa-heart wish-list-searchlist iconcolor mr-2"></i>
                        //   <b>Remove from Wishlist</b>
                        // </button>
                        <button
                          title="Add to wishlist"
                          className="all-event1 brder-lr-blue py-0 edgtf-btn edgtf-btn-gapped_outline d-inline-block w-100 add-to-bag-link"
                          onClick={() => removeToWhishList(product?._id)}
                        >
                          {/* <i className="fas fa-heart wish-list-searchlist mr-2"></i> */}
                          <span className="edgtf-btn-text  fs-16">
                            Remove from Wishlist
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
                        </button>
                      ) : (
                        <button
                          title="Add to wishlist"
                          className="all-event1 brder-lr-blue py-0 edgtf-btn edgtf-btn-gapped_outline d-inline-block w-100 add-to-bag-link"
                          onClick={() => addToWishList(product?._id)}
                        >
                          <i className="fas fa-heart wish-list-searchlist mr-2"></i>
                          <span className="edgtf-btn-text  fs-16">
                            Add to Wishlist
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
                        </button>
                      )
                        // )
                      }
                    </div>
                  </div>
                </div>

                {/* {product?.attr_type?.attrs?.map(attr => {
                  return (
                    product?.attrs[attr._id] != "-" && (
                      <>
                        <div className="mt-3"></div>
                        <h5 className="clr-sku mb-0">{attr.value}</h5>
                        <p>{product?.attrs[attr._id]}</p>
                        <ScrollAnimation
                          className="filter-brdr-img"
                          animateIn="fadeIn"
                          duration={2}
                          animateOnce={true}
                        >
                          <img src={"../images/border-black.png"} />
                        </ScrollAnimation>
                      </>
                    )
                  );
                })} */}

                <div className="mt-4">
                  <h5 className="mb-0 clr-sku">Product Description</h5>
                  <p>{product?.description}</p>
                  {/* <h5 className="clr-sku2">features</h5>
                  <p>
                    2 main compartment with zip closure
                    <br />
                    padded shoulder strap
                    <br />
                    1 zip pocket
                    <br />
                    water-resistance:yes
                  </p> */}
                  {product?.size.length > 0 &&
                    <h5 className="clr-sku2">size & fit</h5>
                  }
                  {product &&
                    product?.size?.map((val, index) => (

                      <p key={index} className="mb-0">
                        {val?.title + " "}
                        {val?.minsize &&
                          "(" + val?.minsize + " - " + val?.maxsize + ")"}
                      </p>
                    ))}
                  {/* <h5 className="clr-sku2">material & care</h5>
                  <p>
                    polyester
                    <br />
                    Wipe with a clean, dry cloth to remove dust
                    <br />
                  </p> */}
                  <h5 className="clr-sku2 mt-2">specifications</h5>
                  <div className="row mt-3">
                    {product?.attr_type?.attrs?.map((attr, index) => {
                      return (
                        product?.attrs &&
                        product?.attrs?.[attr._id] != "-" && (
                          <div
                            key={index}
                            className="col-5 specification-border"
                          >
                            <h6 className="h-16">{attr.value}</h6>
                            <p className="p-18">{product?.attrs?.[attr._id]}</p>
                          </div>
                        )
                      );
                    })}
                  </div>
                  {/* <div className="row mt-3">
                    <div className="col-5 specification-border">
                      <h6 className="h-16">external pocket</h6>
                      <p className="p-18"> zip pocket</p>
                    </div>
                    <div className="col-5 specification-border">
                      <h6 className="h-16">haul loop type</h6>
                      <p className="p-18"> non-padded</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-5 specification-border">
                      <h6 className="h-16">material</h6>
                      <p className="p-18"> polyester</p>
                    </div>
                    <div className="col-5 specification-border">
                      <h6 className="h-16">number of external pockets</h6>
                      <p className="p-18">1</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-5 specification-border">
                      <h6 className="h-16">number of main compartments</h6>
                      <p className="p-18"> 1</p>
                    </div>
                    <div className="col-5 specification-border">
                      <h6 className="h-16">number of zips</h6>
                      <p className="p-18"> 3 and more</p>
                    </div>
                  </div>
                   */}
                  <h5 className="clr-sku mb-0 mt-3">reviews</h5>
                  <ScrollAnimation
                    className="filter-brdr-img"
                    animateIn="fadeIn"
                    duration={2}
                    animateOnce={true}
                  >
                    <img src={"../images/border-black.png"} />
                  </ScrollAnimation>
                  {/* {product?.reviews?.length >0 && product?.reviews?.map(review => {
                  return (
                    <> */}
                  {product?.reviews?.length ? (
                    <>
                      <div className="row my-3 span-brdr1 reviewSection">
                        <div className="col-4 rating-h4 border-right-2px px-0 py-3">
                          <h1 className="display-2 font-gtm-light mb-0 totalRating">
                            {(totalrating / product?.reviews?.length).toFixed(
                              1
                            )}
                            <span className="verifiedUser">
                              {" "}
                              <i className="fa fa-star verifiedUser"></i>
                            </span>
                          </h1>
                          <p> {product?.reviews?.length} verified buyers</p>
                        </div>
                        <div className="col-8 mt-2 ">
                          <div className="my-2">
                            <span className="px-1 ">5</span>
                            <span className="pr-1">
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="bg-green-line mx-3 Totalstar"></span>
                            <span>{ratingFive}</span>
                          </div>
                          <div className="my-2">
                            <span className="px-1">4</span>
                            <span className="pr-1">
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="bg-yellow-line mx-3 Totalstar"></span>
                            <span>{ratingFour}</span>
                          </div>
                          <div className="my-2">
                            <span className="px-1">3</span>
                            <span className="pr-1">
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="bg-pink-line mx-3 Totalstar"></span>
                            <span>{ratingThree}</span>
                          </div>
                          <div className="my-2">
                            <span className="px-1">2</span>
                            <span className="pr-1">
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="bg-green-line mx-3 Totalstar"></span>
                            <span>{ratingTwo}</span>
                          </div>
                          <div className="my-2">
                            <span className="px-1">1</span>
                            <span className="pr-1">
                              <i className="fa fa-star"></i>
                            </span>
                            <span className="bg-pink-line mx-3 Totalstar"></span>
                            <span>{ratingOne}</span>
                          </div>
                        </div>
                      </div>
                      <h5>Customer reviews ({product?.reviews?.length})</h5>
                      {product?.reviews?.length > 0 &&
                        product?.reviews?.map((review, index) => {
                          return (
                            <div
                              key={index}
                              className="specification-border2 mt-3"
                            >
                              <p>
                                <span className="badge badge-pill badge-success">
                                  <i className="fa fa-star"></i>
                                  {review.rating}
                                </span>
                                <span className="pl-2">{review.comment}</span>
                              </p>
                              <span className="review-img">
                                <img src={review.image}></img>
                              </span>
                              {/* <span className="px-2 review-img">
                            <img
                              className=""
                              src="../images/bag/bag6.png"
                            ></img>
                          </span> */}
                              <p className=" font-review">
                                {review.name}
                                <span className="border-right px-2">|</span>
                                {/* {Date(review.updatedAt).toDateString()} */}
                                {new Date(review.updatedAt).toDateString()}
                              </p>
                            </div>
                          );
                        })}
                    </>
                  ) : (
                    <h5>No Reviews Yet</h5>
                  )}
                  {/* <div className="specification-border2">
                    <p>
                      <span className="badge badge-pill badge-success ">
                        <i className="fa fa-star "></i> 3
                      </span>
                      <span className="pl-2">
                        {" "}
                        The bag looks exactly like the picture. The quality is
                        great.
                      </span>
                    </p>
                    <p className=" font-review">
                      priyanka<span className="border-right px-2">|</span>7 Nov
                      2020
                    </p>
                  </div> */}
                  {/* </> */}
                  {/* // )})} */}
                  {/* <div className="specification-border2 mt-3">
                    <p>
                      <span className="badge badge-pill badge-success">
                        <i className="fa fa-star"></i> 3
                      </span>
                      <span className="pl-2">
                        Loved the bag. Soft material. Though the size is small
                      </span>
                    </p>
                    <p className=" font-review">
                      vandana<span className="border-right px-2">|</span>21
                      April 2020
                    </p>
                  </div>
                  <div className="specification-border2 mt-3">
                    <p>
                      <span className="badge badge-pill badge-success">
                        <i className="fa fa-star"></i> 5
                      </span>
                      <span className="pl-2">
                        The product was very very good i like the product good
                        quality thanku team boombolt{" "}
                      </span>{" "}
                    </p>
                    <p className=" font-review">
                      yash kamalia<span className="border-right px-2">|</span>21
                      April 2020
                    </p>
                  </div>
                   */}
                  <div className="position-relative pink-bg-btn2 mt-5 ">
                    {/* <a
                      href=""
                      className="all-event1 brder-lr-pink edgtf-btn edgtf-btn-gapped_outline px-3 py-2 fs-16"
                    >
                      <span className="edgtf-btn-text text-pink">
                        read more
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
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* similar product  */}
          <div className="container-fluid px-0 pb-5">
            {product?.related?.length > 0 && (
              <>
                <div className="row no-gutters">
                  <div className="col-12 pb-4 pt-5 text-center">
                    <div className="similar-product-txt-pos-rm">
                      <p className="category-heading-subtxt">similar product</p>
                      <ScrollAnimation
                        className="filter-brdr-img"
                        animateIn="fadeIn"
                        duration={2}
                        animateOnce={true}
                      >
                        <img src={"../images/border-black.png"} />
                      </ScrollAnimation>
                    </div>
                  </div>
                </div>
                <div className="row no-gutters pb-5">
                  <div className="col-md-12 newarrivals similarproduct">
                    <Carousel
                      cols={4}
                      rows={1}
                      gap={4}
                      loop={true}
                      showDots={true}
                    >
                      {product?.related?.length > 0 &&
                        product?.related?.map((product, index) => {
                          return (
                            <Carousel.Item key={index}>
                              <a href={"/productdetail/" + product.slug}>
                                <div className="bagpack bg-e1 pb-2">
                                  <div className="bagpack-img text-center pt-4">
                                    <img src={product.images[0]} />
                                  </div>
                                  <div className="bagpack-info px-3">
                                    <p className="bagpack-name">
                                      {product.name}
                                    </p>
                                    <span className="span-rs">
                                      &#8377; {product?.discount_price}{" "}
                                    </span>
                                    <span className="strike-rs">
                                      <s>&#8377;{product?.price}</s>{" "}
                                    </span>
                                    <span className="off-percent">
                                      (
                                      {Math.round(
                                      ((product?.price -
                                        product?.discount_price) *
                                        100) /
                                      product?.price
                                    )}
                                      % off)
                                    </span>
                                    <p className="bagpack-star mb-2">
                                      <span className="bagpack-star-span">
                                        <i className="fa fa-star"></i>
                                        <span>
                                          {product?.rating
                                            ? (product?.rating).toFixed(1)
                                            : 0}
                                        </span>
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </a>
                            </Carousel.Item>
                          );
                        })}

                      {/* <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-white pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag2.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-e1 pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag3.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-white pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag4.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-e1 pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag5.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-white pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag6.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-e1 pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag1.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-white pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag2.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-e1 pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag3.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-white pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag3.png"} />
                        </div>
                        <div className="bagpack-info px-4">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-e1 pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag5.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="">
                      <div className="bagpack bg-white pb-2">
                        <div className="bagpack-img text-center pt-4">
                          <img src={"../images/bag/bag6.png"} />
                        </div>
                        <div className="bagpack-info px-3">
                          <p className="bagpack-name">boombolt backpack</p>
                          <span className="span-rs">&#8377; 799 </span>
                          <span className="strike-rs">
                            <s>&#8377;1499</s>{" "}
                          </span>
                          <span className="off-percent">(46% off)</span>
                          <p className="bagpack-star mb-2">
                            <span className="bagpack-star-span">
                              <i className="fa fa-star"></i>
                              <span>4.5</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </a>
                  </Carousel.Item>*/}
                    </Carousel>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetail;
