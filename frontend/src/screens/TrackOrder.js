import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import axios from "axios";
import { singleEventDetail } from "../actions/eventActions";

const TrackOrder = ({ match, history }) => {
  const awb_code = match.params.awb;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const productTopRated = useSelector(state => state.productTopRated);
  const { error, products } = productTopRated;
  const [shipmentActivities, setShipmentActivities] = useState();
  console.log(shipmentActivities, "awb_code");
  const eventList = useSelector(state => state.singleEvent);
  const events = eventList.product;
  useEffect(() => {
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
          url: `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb_code}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${response.data.token}`
          }
        };
        axios(config)
          .then(function(response) {
            console.log(response);
            setShipmentActivities(response.data?.tracking_data);
          })
          .catch(function(error) {
            console.log(error);
            alert("Your Order is not yet Shipped");
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [dispatch]);
  const activityDate = date => {
    date = new Date(date);
    return date.toDateString();
  };
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div class="card-group">
            {shipmentActivities?.track_status ? (
              <>
                <div
                  class="card bg-white m-5"
                  style={{
                    width: "500px",
                    height: "auto",
                    borderRadius: "7px"
                  }}
                >
                  <div class="card-body text-left ">
                    <div className="row">
                      <div className="col-6">
                        <span>
                          <b>Status:</b>
                        </span>
                        <h3 class="card-text text-left">
                          {
                            shipmentActivities?.shipment_track[0]
                              ?.current_status
                          }
                        </h3>
                        <p class="card-text text-left">
                          <b>Consignee Name:</b>
                          {" " +
                            shipmentActivities?.shipment_track[0]
                              ?.consignee_name}
                          <br />
                          <b>Tracking ID:</b>
                          {" " +
                            shipmentActivities?.shipment_track[0]?.awb_code}
                        </p>
                      </div>
                      <div className="col-6">
                        <p class="card-text text-right">
                          <b>Order Id:</b>
                          {shipmentActivities?.shipment_track[0]?.order_id}
                        </p>
                        <p className="card-text text-right">
                          <a href={shipmentActivities?.track_url}>Track Live</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="card-body">
                    {shipmentActivities &&
                      shipmentActivities.shipment_track_activities.map(
                        (activity, index) => (
                          <>
                            <div className="row">
                              <div class="card-body text-left col-3">
                                <p class="card-text">
                                  {activityDate(activity.date)}
                                  <br />
                                </p>
                              </div>
                              <div class="card-body text-left col-9">
                                <p class="card-text">
                                  Activity : {activity.activity}
                                  <br />
                                  Location : {activity.location}
                                </p>
                              </div>
                            </div>
                            <hr />
                          </>
                        )
                      )}
                  </div>
                </div>
              </>
            ) : (
              <div
                class="card bg-white m-5"
                style={{
                  width: "500px",
                  height: "auto",
                  borderRadius: "7px"
                }}
              >
                <div class="card-body text-left ">
                  <h3 class="card-text text-left">
                    Your Order is not yet shipped.
                  </h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackOrder;
