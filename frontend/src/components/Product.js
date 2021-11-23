import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Carousel } from "react-bootstrap";
import { addWhishList } from "../actions/userActions";
import { login } from "../actions/userActions";
import { getWishList, removeWish } from "../actions/productActions";

const Product = ({ history, product }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  var wishList = useSelector((state) => state.wishList);
  const [productId, setProductId] = useState("");
  const [wish, setWish] = useState(false);
  const log = useSelector((state) => state.showLogin);
  const { userInfo } = userLogin;

  var [userId, setUserId] = useState(
    userInfo && userInfo._id ? userInfo._id : ""
  );

  useEffect(() => {
    if (log.products.payload == false && wish == true) {
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
    <Card className="my-3 p-3 rounded ">
      <Link to={`/products/${product.slug}`}>
        <Card.Img src={product.images[0]} variant="top" />
      </Link>

      <Card.Body className="px-0 pb-0">
        <Link to={`/products/${product.slug}`}>
          <Card.Title className="card-title-strong" as="div">
            <p className="mb-0">{product.description}</p>
          </Card.Title>
        </Link>

        {product.discount_price ? (
          <Card.Text as="p" className="built-price">
            <span className="build-price-txt">
              Retail Price{" "}
              <del className="del-txt">${product.price.toLocaleString()}</del>
            </span>
            <br />
            {/* &emsp; */}
            <span className="build-price-value">Our Price </span>
            <span className="build-price">
              ${product.discount_price.toLocaleString()}
            </span>
            <br />
            <span>You Save </span>
            <span className="savePrice">
              $
              {product.Difference
                ? Math.abs(product.Difference).toLocaleString()
                : Math.abs(product.difference).toLocaleString()}
              (
              {product.percentage_diff
                ? product.percentage_diff
                : product.Percentage_diff}
              %)
            </span>
          </Card.Text>
        ) : (
          <Card.Text as="p" className="built-price">
            <span className="build-price-txt">
              Retail Price $ {product.price.toLocaleString()}
            </span>
            <br />
            {/* &emsp; */}
            <span className="build-price-value">Our Price </span>
            <br />
            <span>You Save </span>
            <span className="savePrice">
              $
              {product.Difference
                ? Math.abs(product.Difference).toLocaleString()
                : Math.abs(product.difference).toLocaleString()}
              (
              {product.percentage_diff
                ? product.percentage_diff
                : product.Percentage_diff}
              %)
            </span>
          </Card.Text>
        )}

        {/* <Card.Text as="p" className="card-text">
          {product.short_desc}
        </Card.Text> */}
        <div className="row my-3">
          <div className="col-7">
            {/* <button
              title="Add to cart"
              className="search-list-addtocart-btn"
              onClick={() => addToCartHandler(product._id)}
            > */}

            {/* </button> */}
          </div>

          <div className="col-5 text-right">
            <i
              className="fas fa-shopping-cart add-to-cartbtn mr-2"
              title="Add To Cart"
              onClick={() => addToCartHandler(product._id)}
            ></i>
            {
              // wishList.products.map((data) =>
              wishList?.products?.findIndex((prd) => prd._id === product?._id) >
              -1 ? (
                <i
                  title="Remove from wishlist"
                  className="fas fa-heart wish-list-searchlist iconcolor"
                  title="Add To Wishlist"
                  onClick={() => removeToWhishList(product._id)}
                ></i>
              ) : (
                <i
                  title="Add to wishlist"
                  className="fas fa-heart wish-list-searchlist "
                  title="Add To Wishlist"
                  onClick={() => {
                    addToWhishList(product._id);
                  }}
                ></i>
              )
              // )
            }
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
