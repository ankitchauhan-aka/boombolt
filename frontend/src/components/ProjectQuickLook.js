import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
// import { Carousel } from "react-bootstrap";
import { addWhishList } from "../actions/userActions";
import { login } from "../actions/userActions";
import { getWishList, removeWish } from "../actions/productActions";
import ScrollAnimation from "react-animate-on-scroll";
import { SRLWrapper } from "simple-react-lightbox";
import Carousel from "react-grid-carousel";


const ProductQuickLook = ({ handleClose, singleProduct }) => {

  const [clr, setColor] = useState('');
  const [size, setSize] = useState('');

  console.log(singleProduct, "singleProductsingleProductsingleProductsingleProduct");
  const handleColorChange = (e, color) => {
    setColor(color);
  };
  const handleSizeChange = (e, sizeitem) => {
    setSize(sizeitem);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">

          <SRLWrapper>
            <div className="row no-gutters">
              {singleProduct?.images?.map((image, index) => {
                return (
                  index < 1 && (
                    <div key={index} className="col-md-12">
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
        <div className="col-md-6 pl-md-4 pt-5 pt-md-0">

          <Carousel
            cols={3}
            rows={1}
            gap={30}
            loop={true}
          // showDots={true}
          >
            {singleProduct && (
              <Carousel.Item key={singleProduct.id}>
                <div className="image-div-hover-link-outer hotsingleProduct-images-main-div">
                  <div className="new-arival-ul image-div-hover-link-middle hotsingleProduct-images-outer">
                    <div className="image-div-hover-link d-flex">
                      {/* <img
                        width="100%"
                        src={singleProduct.image}
                        alt=" "
                        height="300px"
                      /> */}
                      {singleProduct?.images?.map((image, index) => {
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
                                        height="300px"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        );
                      })}
                      <div className="hotsingleProduct-inner-div align-self-center">
                        <div className="hotsingleProduct-inner-subdiv hotsingleProduct-images">
                          <a
                            href={`/productcatalouge/${singleProduct?.categories[0]?.slug}`}
                            className="py-4 d-block"
                          >
                            <h3>{singleProduct?.categories[0]?.title}</h3>

                            {/* <ul key={singleProduct.id} className="timerUl">
                              <li key={`key0${key}`}>
                                <span>
                                  {timeLeft[key]?.months &&
                                    addLeadingZeros(timeLeft[key]?.months)
                                    ? addLeadingZeros(
                                      timeLeft[key]?.months
                                    )
                                    : "00"}
                                </span>
                                <p>months</p>
                              </li>
                              <li key={`key1${key}`}>
                                <span>
                                  {addLeadingZeros(
                                    timeLeft[key]?.days
                                      ? timeLeft[key]?.days
                                      : "00"
                                  )}
                                </span>
                                <p>days</p>
                              </li>
                              <li key={`key2${key}`}>
                                <span>
                                  {addLeadingZeros(
                                    timeLeft[key]?.hours
                                      ? timeLeft[key]?.hours
                                      : "00"
                                  )}
                                </span>
                                <p>hours</p>
                              </li>
                              <li key={`key3${key}`}>
                                <span>
                                  {addLeadingZeros(
                                    timeLeft[key]?.minutes
                                      ? timeLeft[key]?.minutes
                                      : "00"
                                  )}
                                </span>
                                <p>mins</p>
                              </li>
                              <li key={`key4${key}`}>
                                <span>
                                  {addLeadingZeros(
                                    timeLeft[key]?.seconds
                                      ? timeLeft[key]?.seconds
                                      : "00"
                                  )}
                                </span>
                                <p>secs</p>
                              </li>
                            </ul> */}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            )}
          </Carousel>
          {/* <p className="mb-0 line-height1 pd-p1">{singleProduct?.name}</p>
          <p className="mb-1 pd-p3 clr-sku">
            <span>sku: </span>
            <span>{singleProduct?.sku}</span>
          </p>
          {singleProduct?.reviews?.length > 0 && (
            <p className="mb-0 pd-p4 rating-p my-3">
              <span>
                {(singleProduct?.rating).toFixed(1)}{" "}
                <i className="fa fa-star"></i> |{" "}
                {singleProduct?.reviews?.length} ratings
              </span>
            </p>
          )}
          <p className="mb-0 mb-0 pd-p5 line-height1">
            <span className="single-product-bag-price">
              &#8377; <span>{singleProduct?.discount_price}</span>
            </span>
            &nbsp;
            <span className="single-product-bag-strike-price">
              <s>
                &#8377;<span>{singleProduct?.price}</span>
              </s>
            </span>
            &nbsp;
            <span className="single-product-bag-off">
              (
              {Math.round(
                ((singleProduct?.price - singleProduct?.discount_price) * 100) /
                singleProduct?.price
              )}
              % off)
            </span>
          </p>
          <p className="mb-0 pd-p6 clr-sku">inclusive of all Tax.</p>
          <p className="mb-0 pd-p7">
            {singleProduct?.description}
          </p>
          {singleProduct?.colors.length > 0 &&
            <div className="mt-2">
              <p className="mb-0 pd-p8 clr-sku text-capitalize">Color</p>
              <div className="pt-1">
                {singleProduct?.colors?.map((color, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
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
          {singleProduct?.size.length > 0 &&
            <div className="mt-2">
              <p className="mb-0 pd-p8 clr-sku">Size</p>
              <div className="pt-1">
                {singleProduct?.size?.map((sizeitem, index) => {
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
          {singleProduct?.waranty.length > 0 &&
            <div className="mt-2">
              <p className="mb-0 pd-p8 clr-sku text-capitalize">warranty</p>
              <ScrollAnimation
                className="filter-brdr-img"
                animateIn="fadeIn"
                duration={2}
                animateOnce={true}
              >
                <img src={"../images/border-black.png"} />
              </ScrollAnimation>
              <p>{singleProduct?.waranty}</p>
            </div>
          }

          <p className="clr-sku mt-2">available offers</p>

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
          </ul> */}

        </div>

      </div>
    </>
  )
}
export default ProductQuickLook;

