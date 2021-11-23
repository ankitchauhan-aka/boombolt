import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";
import { getWishList, removeWish } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
import UserNav from "../screens/useNav";

const Wishlist = ({ match, history }) => {
  const dispatch = useDispatch();
  const wishList = useSelector(state => state.wishList);
  var {products} = wishList;
  var wishProduct = products;
  const [productName, setProductName] = useState("");
  const [wishproductName, setWishProductName] = useState(products);

  var userId;
  if (localStorage.userInfo) {
    userId = JSON.parse(localStorage.userInfo)?._id;
  }
  useEffect(() => {
    if (userId) {
      dispatch(getWishList(userId));
    } else {
      history.push(`/`);
    }
  }, [dispatch]);

  const wishToCardHandler = productId => {
    // dispatch(removeWish(productId, userId));
    if (productId) {
      dispatch(addToCart(productId));
    }
  };

  const callRemoveWish = (productId, userId) => {
    dispatch(removeWish(productId, userId));
  };

  const searchHandler = e => {
    e.preventDefault();
    products.map(data => {
      if (data.name === productName) {
        wishProduct = data;
      }
    });
  };
  const [filter, setFilter]= useState(true);
  function toggleFilter(){
    setFilter(!filter);
  }
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item href="/wishlist">my wishlist</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image">
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col-md-12 text-center imagess">
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
                  alt=" "
                  className="home-location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div className="row background-image">
        <div className="col-md-4 col-lg-3">
          <div className="row my-4">
            <div className="col-md-12">
              <h4 className="welcome-user-name mb-3 text-center">My Wishlist</h4>
            </div>
          </div>
          <button
            className="d-block d-md-none filter-btn mb-3"
            type="button"
            onClick={toggleFilter}
          >
            My Wishlist
                   </button>

          <div
            className={`col-md-12 col-lg-12 col-xl-12 ${filter ? "d-none" : "d-block"
              } d-md-block`}
          >
            <div className="row">
              <div className="col-md-12 col-lg-12 mx-5">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 col-lg-9">
          <div className="row">
            <div className="col-md-8 col-lg-6 ml-auto mt-md-0">
              <form onSubmit={searchHandler} className="search-input-group">
                <div className="input-group mt-4 searchFormWishlist">
                  <input
                    type="text"
                    name="q"
                    className="form-control form-control-md search-input search-wishlist"
                    placeholder="Search with product name"
                    style={{ background: "#cccccc", color: "#000" }}
                    onChange={e => setProductName(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-search" type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {wishProduct && wishProduct.length ? (
            wishProduct.map(product => (
              <div key={product?._id} className="row mt-4 card-hovered mb-5 border-bottom-cstm">

                <div className="col-md-4 text-center align-self-center">
                  <img src={product?.images[0]} className="w-75 wishlistProductImage" />
                </div>
                <div className="col-md-8">
                  <div className="row pt-5">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6 productDetail">
                          <p className="search-list-product-name">
                            {product?.name}
                          </p>
                          <p className="search-list-product-name">
                            {product?.description}
                          </p>
                          <p className="search-list-product-name">
                            {product?.short_desc}
                          </p>
                          <p className="cross-text">
                            <strike className="doller-cross">
                              ${product?.price.toLocaleString()}
                            </strike>

                            <span className="live-price">
                               &nbsp;&nbsp;${product?.discount_price.toLocaleString()}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6 buttonDiv">
                          <button
                            onClick={() => callRemoveWish(product?._id, userId)}
                            className="cancel-order-btn bg-danger text-white footer-subscribe-btn text-uppercase ml-0"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => wishToCardHandler(product?.slug)}
                            className=" proceed-checkout-btn mt-3 footer-subscribe-btn text-uppercase ml-0 addtocart-button"
                          >
                            <i className="fas fa-shopping-cart add-to-cartbtn mr-2"></i>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row pb-5 addtocart">
                    <div className="col-md-12">
                      {/* <button
                          onClick={() => wishToCardHandler(product?.slug)}
                          className="footer-subscribe-btn text-uppercase ml-0 addtocart-button"
                        >
                          <i className="fas fa-shopping-cart add-to-cartbtn mr-2"></i>
                          Add to Cart
                        </button> */}
                      {/* <button
                        onClick={() => callRemoveWish(product._id, userId)}
                        className="footer-subscribe-btn text-uppercase d-md-none remove-buton"
                      >
                        Remove
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <div className="row mt-4">
              <div className="col-md-12 wishlist-empty">
                <h2>Wishlist is empty!</h2>
                <hr className="mt-0" />
                <Link
                  className="shoppimg-cart-continue-shoppingbtn "
                  to="/productCatalouge"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Wishlist;
