import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders, cancelOrder } from "../actions/orderActions";
// import { Form, Button, Row, Col } from 'react-bootstrap'
import { createProductReview } from "../actions/productActions";
import { Form, Button, Row, Col } from "react-bootstrap";
// import { useAlert } from "react-alert";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";


const RatingsReview = ({ match, history }) => {
  const dispatch = useDispatch();
  const orderId = match.params.order;
  const productId = match.params.product;
  const orderListMy = useSelector((state) => state.orderListMy);
  const review_Response = useSelector((state) => state.productReviewCreate);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;
  const [product, setProduct] = useState({});
  const [image, setImage] = useState("");
  const [ratings, setRatings] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //   const alert = useAlert();

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (orders && orders.length) {
      orders.map((order) => {
        order.orderItems.map((product) => {
          if (product.product == productId) {
            setProduct(product);
          }
        });
      });
    }
  }, [orders]);

  useEffect(() => {
    if (review_Response?.success?.message == "Product already reviewed") {
      //   alert.info("Product Already Reviewed ");
      history.push("/allOrders");
    } else if (review_Response?.success?.message == "Review added") {
      //   alert.success("Review Added Successfully!");
      console.log("Review Added Successfully!");
      history.push("/allOrders");
    }
  }, [review_Response]);

  if (!product) {
    return <h1>No Product in your orders</h1>;
  }

  const addRatings = (item_rating) => {
    setRatings(item_rating.ratings);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.product, {
        ratings,
        description,
        image,
      })
    );
  };

  function setImageData(e) {
    const file = e.target.files[0];
    if (!file) {
      return;      
    }
    var reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = function () {
      setImage(`data:${file.type};base64,${btoa(reader.result)}`);
    };
  }
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark m-0">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item href="/allOrders/">completed orders</Breadcrumb.Item>
                <Breadcrumb.Item>review</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-3">
        <Form onSubmit={submitHandler}>
          <div className="row background-color mx-md-0">
            <div className="col-md-6 mt-3">
              <h3 className="userorder7-rating-heading">Ratings & Reviews</h3>
            </div>
            <div className="col-md-3 mt-4 productImage">
              <img src={product.image} height="200px" width="200px" />
            </div>
            <div className="col-md-3 mt-3 productNameStar">
              <p className="userorder7-product-text productNameStar">{product.name} </p>
              <p className="userorder7-product-text"></p>
              <i className="fas fa-star userorder7-star-rating productNameStar"></i>
              <i className="fas fa-star userorder7-star-rating"></i>
              <i className="fas fa-star userorder7-star-rating"></i>
              <i className="fas fa-star userorder7-star-rating"></i>
              <i className="fas fa-star userorder7-star-rating1"></i>
            </div>
          </div>
          <div className="row mt-4 py-3 border-bottom-black">
            <div className="col-md-12 col-12">
              <p className="userorder-7-rate-this-product">Rate this product</p>
              <i
                className={
                  ratings.includes(1)
                    ? "fas fa-star rate-this-product-star color_yellow"
                    : "fas fa-star rate-this-product-star"
                }
                onClick={() => addRatings({ ratings: [1] })}
              ></i>
              <i
                className={
                  ratings.includes(2)
                    ? "fas fa-star rate-this-product-star ml-1 color_yellow"
                    : "fas fa-star rate-this-product-star ml-1"
                }
                onClick={() => addRatings({ ratings: [1, 2] })}
              ></i>
              <i
                className={
                  ratings.includes(3)
                    ? "fas fa-star rate-this-product-star ml-1 color_yellow"
                    : "fas fa-star rate-this-product-star ml-1"
                }
                onClick={() => addRatings({ ratings: [1, 2, 3] })}
              ></i>
              <i
                className={
                  ratings.includes(4)
                    ? "fas fa-star rate-this-product-star ml-1 color_yellow"
                    : "fas fa-star rate-this-product-star ml-1"
                }
                onClick={() => addRatings({ ratings: [1, 2, 3, 4] })}
              ></i>
              <i
                className={
                  ratings.includes(5)
                    ? "fas fa-star rate-this-product-star ml-1 color_yellow"
                    : "fas fa-star rate-this-product-star ml-1"
                }
                onClick={() => addRatings({ ratings: [1, 2, 3, 4, 5] })}
              ></i>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12 col-12">
              <p className="userorder-7-rate-this-product">Review this product</p>
            </div>
          </div>
          <div className="row textarea-border border-bottom-none">
            <div className="col-md-12 col-12">
              <p className="textarea-heading">Description</p>
              <textarea
                className="form-control form-control-sm"
                rows="5"
                cols="50"
                placeholder="Write Description here..."
                onChange={e => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="row textarea-border">
            <div className="col-md-12 col-12">
              <p className="textarea-heading mt-3">Title (Optional)</p>
              <input
                placeholder="Review Title"
                className="form-control w-20"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-5 pb-3">
            <div className="col-md-6 col-6">
              <div className="image-upload">
                {/* <label htmlFor="file-input">
                  <img
                    src="/images/img-upload.jpeg"
                    className="w-50 for-pointer"
                  />
                </label> */}
                <input id="file-input" type="file" onChange={setImageData} />
                {image && (
                  <img
                    className="reviewImage"
                    src={image}
                    alt="product"
                    height="150px"
                    width="150px"
                  />
                )}
              </div>
            </div>
            <div className="col-md-6 col-6 text-right">
              <button className="userorder7-submit-btn">SUBMIT</button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default RatingsReview;
