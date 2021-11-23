import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addWhishList } from "../actions/userActions";
import { login } from "../actions/userActions";
import {removeWish } from "../actions/productActions";

const ProductList = ({ product, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const wishList = useSelector((state) => state.wishList);

  const [productId, setProductId] = useState("");
  const [wish, setWish] = useState(false);

  const { userInfo } = userLogin;
  var [userId, setUserId] = useState(
    userInfo && userInfo._id ? userInfo._id : ""
  );
  useEffect(() => {
    if (userLogin.payload === false && wish === true) {
      if (userLogin?.userInfo) {
        userId = userLogin?.userInfo?._id;

        dispatch(addWhishList({ userId, productId }));
      }
    }
  }, [userInfo]);

  const removeToWhishList = (productId) => {
    setProductId(productId);

    dispatch(removeWish(productId, userId));
  };

  const addToCartHandler = (id) => {
    history.push(`/cart/${id}?qty=1`);
  };

  const addToWhishList = (productId) => {
    setProductId(productId);
    if (!userInfo) {
      setWish(true);
      dispatch(login(true));
    } else {
      dispatch(addWhishList({ userId, productId }));
    }
  };

  return (
    <>
      <div className="row mt-3 ml-md-3 card-hover card-data">
        <div className="col-md-4 text-center">
          <Link to={`/products/${product.slug}`}>
            <img src={product.images[0]} alt=" " className="w-75" />
          </Link>
        </div>

        <div className="col-md-8">
          <div className="row mt-4"></div>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <Link
                    to={`/products/${product.slug}`}
                    className="product_link"
                  >
                    <p
                      className="search-list-product-name four-line-text"
                      style={{ fontSize: "15px" }}
                    >
                      <b>
                        {product.description.split("-")[0]} -{" "}
                        {product.categories[0].title}{" "}
                      </b>
                    </p>
                  </Link>
                  <Link
                    to={`/products/${product.slug}`}
                    className="product_link"
                  >
                    <p className="search-list-product-name four-line-text">
                      {product.description}
                    </p>
                  </Link>
                  <p className="built-price">
                    <span className="build-price-txt">
                      Retail Price{" "}
                      <del className="del-txt">
                        ${product.price.toLocaleString()}
                      </del>
                    </span>

                    <span className="build-price-value ml-2"> Our Price </span>
                    <span className="build-price mr-2">
                      ${product.discount_price.toLocaleString()}
                    </span>

                    <span> You Save </span>
                    <span className="savePrice">
                      $
                      {product.Difference !== undefined
                        ? Math.abs(product.Difference).toLocaleString()
                        : Math.abs(product.difference).toLocaleString()}
                      (
                      {product.percentage_diff !== undefined
                        ? product.percentage_diff
                        : product.Percentage_diff}
                      %){" "}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-3">
              <button
                title="Add to cart"
                className="search-list-addtocart-btn addtocart"
                onClick={() => addToCartHandler(product._id)}
              >
                <i className="fas fa-shopping-cart add-to-cartbtn mr-2"></i>
                <b>Add to Cart</b>
              </button>
            </div>
            <div className="col-8">
              {
                wishList?.products?.findIndex(
                  (prd) => prd._id === product?._id
                ) > -1 ? (
                  <button
                    title="Add to wishlist"
                    className="search-list-addtocart-btn"
                    onClick={() => removeToWhishList(product._id)}
                  >
                    <i className="fas fa-heart wish-list-searchlist iconcolor mr-2"></i>
                    <b>Remove from Wishlist</b>
                  </button>
                ) : (
                  <button
                    title="Add to wishlist"
                    className="search-list-addtocart-btn"
                    onClick={() => addToWhishList(product._id)}
                  >
                    <i className="fas fa-heart wish-list-searchlist mr-2"></i>
                    <b>Add to Wishlist</b>
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
