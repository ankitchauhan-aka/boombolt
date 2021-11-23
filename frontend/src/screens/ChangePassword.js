import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
import { getUserDetails, updateUserProfile, logout } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import HeaderWhite from "../components/HeaderWhite";
import UserNav from "./useNav";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ChangePassword = ({ history }) => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage]=useState("");

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userId = userInfo?._id;
  const usersDetail = useSelector(state => state.usersDetail);

  const singleUserDetails = useSelector(state => state.singleUserDetails);
  const { loading, error, user } = singleUserDetails;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  let userError = userUpdateProfile.error;
  const [pass, setPass] = useState(false);
  const [err, setErr] = useState(false);

  const user1 = useSelector(state => state.updateForgetPassword);
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.firstName) {
        // dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails(userId));
      }
    }
  }, [dispatch, history, userInfo, success]);

  const submitHandler = e => {
    e.preventDefault();
    if (password != confirmPassword) {
      setErrorMessage("New and Confirm Passwords do not match");
    }  else {
      // setMessage("gkhgj");
      // userError = "";
      dispatch(
        updateUserProfile({
          id: userId,
          oldPassword,
          password
        })
      );
    }
  };
  useEffect(() => {
    if (success === true) {
      setPass(true);
      // alert("password reset done,please login")
      dispatch(logout());
      setSuccessMessage('Password Change successfull')
    }
    if (userError) {
      setErr(true)
      setErrorMessage("Wrong Current Password.")
    }
  });

  const [filter, setFilter] = useState(true);
  function toggleFilter() {
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
                <Breadcrumb.Item href="/changePassword">
                  change password
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-md-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-1"></div>
            <div className="col-lg-4 col-md-5">
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <h4 className="py-4 login-heading changePassword">
                    {" "}
                    Change Password{" "}
                  </h4>
                  <button
                    className="d-block d-md-none w-100 filter-btn mb-3 bg-none"
                    type="button"
                    onClick={toggleFilter}
                  >
                    change password
                   </button>

                  <div
                    className={`col-md-12 col-lg-12 col-xl-12 ${filter ? "d-none" : "d-block"
                      } d-md-block`}
                  >
                    <UserNav />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-7 mt-4 changePassword">
              <Form onSubmit={submitHandler} className="card p-4 mb-5">
                <div className="form-group shopping-cart-form">
                  <label className="login-form-label font-12">
                    Current password <span className="mandatory">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control login-input-box login-input-box-width"
                    id="cur-pass"
                    onChange={e => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group shopping-cart-form">
                  <label className="login-form-label font-12">
                    New password<span className="mandatory">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control login-input-box login-input-box-width"
                    id="new-pass"
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group shopping-cart-form">
                  <label className="login-form-label font-12">
                    Confirm password<span className="mandatory">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control login-input-box login-input-box-width "
                    id="con-pass"
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="footer-subscribe-btn ml-0 btn btn-primary mt-3 form-control changePasswordButton"
                  >
                    Change password
                  </button>
                  <br />
                  <br />
                  {errorMessage && <Message variant="danger">{errorMessage}</Message>}
                  {successMessage && <Message variant="success">{successMessage}</Message>}

                </div>
              </Form>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
