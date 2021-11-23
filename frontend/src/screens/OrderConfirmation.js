import React, { useState, useEffect } from "react";
import HeaderWhite from "../components/HeaderWhite";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const OrderConfirmation = ({ match, history }) => {
  const orderId = match.params.id;
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item>order confirmation</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid background-image">
        <div className="row h-100 ">
          <div className="col-md-2 col-lg-1"></div>
          <div className="col-md-10 col-lg-11 popup_message">
            <div className="login-text">
              <h3>Order Confirmation</h3>
            </div>
            <div className="row mb-5 mt-5">
              <div className="col-md-2 col-lg-2"></div>
              <div className="col-md-2 col-lg-8 confirm_order">
                <div className="order_confirm pt-4">
                  <h5 className="confirm_message">
                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                    Your Order Is Confirmed
                  </h5>
                  <p>
                    Thanks for shopping! we'd like to inform you that BoomBolt
                    recieved your order and is preparing it for shipment
                  </p>
                  <p>
                    <b>Order:# {orderId}</b>
                  </p>
                  <div className="row">
                    <div className="col-12 viewOrders">
                      <a href="/allOrders">
                        <button className="proceed-checkout-btn">
                          View Or Manage Order
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 col-lg-2"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;
