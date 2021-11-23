import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import "../index.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Carousel from "react-bootstrap/Carousel";
import NewArrivals from "./NewArrivals";
import HotDeals from "./HotDeals";
import EventActivities from "./EventActivities";
import Address from "./Address";
import HomeCategory from "./HomeCategory";
import Header1 from "../components/Header1";

import { getUserDetails } from "../actions/userActions";
import HeaderWhite from "../components/HeaderWhite";

const DashboardScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userDetail = useSelector(state => state.singleUserDetails);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  // const userId = match.params.slug;

  useEffect(() => {
    if (!userInfo?._id) {
      history.push("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(getUserDetails(userInfo?._id));
  }, [userLogin]);

  const updatDetail = () => {
    history.push(`/editDetail/${userInfo?._id}`);
  };
  const changePassword = () => {
    history.push("/changePassword");
  };
  const uploadImage = () => {
    history.push("/uploadImage");
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
                <Breadcrumb.Item href="/login">login</Breadcrumb.Item>
                <Breadcrumb.Item>dashboard</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-5">
        <div className="container-fluid">
          <h3 className="pt-4 pb-3">User Profile</h3>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm mb-4">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>PhoneNumber</th>
                  <th>Email</th>
                  <th>File</th>
                  <th>Action</th>
                  <th>Action2</th>
                  <th>Action3</th>
                </tr>
              </thead>
              <tbody>
                {userInfo ? (
                  <tr>
                    {/* <td>{userInfo._id}</td> */}
                    <td>{userInfo.firstName}</td>
                    <td>{userInfo.lastName}</td>
                    <td>{userInfo.phone}</td>
                    <td>
                      <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                    </td>
                    <td>
                      {user?.file ? (
                        <img src={`${user.file}`} height="50px" width="50px" />
                      ) : (
                        "No file"
                      )}
                    </td>
                    <td>
                      <Button onClick={updatDetail}>Edit Details</Button>
                    </td>
                    <td>
                      <Button onClick={changePassword}>Reset Password</Button>
                    </td>
                    <td>
                      <Button onClick={uploadImage}>Upload Image</Button>
                    </td>
                  </tr>
                ) : (
                  " "
                )}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
