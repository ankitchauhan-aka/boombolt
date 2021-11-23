import React, { useState, useEffect } from "react";
import UserNav from "./useNav";
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";

const CommPreference = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const [commupreference, setComm] = useState(userInfo?.communicationPref);
  const commHandler = commPref => {
    var prefData = [];
    // if (categ.target.checked) {
    if (commupreference?.length > 0) {
      commupreference.map(data => {
        prefData.push(data);
      });
      let index = commupreference.indexOf(commPref);
      if (index == -1) {
        prefData.push(commPref);
      } else {
        prefData.splice(index, 1);
      }
    } else {
      prefData.push(commPref);
    }
    setComm(prefData);
    dispatch(updateUser({ _id: userInfo?._id, prefData })).then(() => {
      alert("Communication Preference updated");
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
            <div className="col-md-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item>communication preference</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="row background-image">
        {/* <div className="col-md-1"></div> */}
        <div className="col-md-4 col-lg-5">
          <div className="row my-4 mx-2">
            <div className="col-md-12 col-lg-12 ml-2">
              <h4 className="welcome-user-name mb-3">
                Communication Preference
              </h4>
            </div>
          </div>
          <button
            className="d-block d-md-none w-90 filter-btn mb-3 bg-none"
            type="button"
            onClick={toggleFilter}
          >
            Communication Preference
                   </button>

          <div
            className={`col-md-12 col-lg-12 col-xl-12 ${filter ? "d-none" : "d-block"
              } d-md-block`}
          >
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-5">
                <UserNav />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-7 col-lg-7 commpref">
          <div className="row mt-5 selectpreference">
            <h5>
              <b>Select your communication preference</b>
            </h5>
          </div>
          <div className="row pt-3 pb-3 mt-4 selectpreference">
            <div className="col-4 col-md-3 p-0 ml-1">
              <h6 className="welcome-user-name mb-0">Phone Call</h6>
            </div>
            <div className="col-4 col-sm-3">
              <label className="checkbox path">
                <input
                  onClick={() => commHandler("call")}
                  type="checkbox"
                  checked={
                    commupreference?.length
                      ? commupreference.includes("call")
                      : false
                  }
                />
                <svg viewBox="0 0 21 21">
                  <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                </svg>
              </label>
            </div>
          </div>
          <div className="row pb-3 selectpreference">
            <div className="col-4 col-md-3 p-0 ml-1">
              <h6 className="welcome-user-name mb-0">Text Message</h6>
            </div>
            <div className="col-4 col-sm-3">
              <label className="checkbox path">
                <input
                  onClick={() => commHandler("text")}
                  type="checkbox"
                  checked={
                    commupreference?.length
                      ? commupreference.includes("text")
                      : false
                  }
                />
                <svg viewBox="0 0 21 21">
                  <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                </svg>
              </label>
            </div>
          </div>
          <div className="row pb-3 selectpreference">
            <div className="col-4 col-md-3 p-0 ml-1">
              <h6 className="welcome-user-name mb-0">Email</h6>
            </div>
            <div className="col-4 col-sm-3">
              <label className="checkbox path">
                <input
                  onClick={() => commHandler("email")}
                  type="checkbox"
                  checked={
                    commupreference?.length
                      ? commupreference.includes("email")
                      : false
                  }
                />
                <svg viewBox="0 0 21 21">
                  <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommPreference;
