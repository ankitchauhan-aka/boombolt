import React, { useEffect, useState } from "react";
import { Route, NavLink, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import SearchBox from "./SearchBox";
import { getWishList, removeWish } from "../actions/productActions";
import {
  login,
  register,
  fetchTopNav,
  // sendOtp,
  resetPassword,
  verifyUser,
  setDefaultBillingAddress,
  logout
} from "../actions/userActions";
import {
  Modal,
  Button,
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
  DropdownButton,
  NavDropdown
} from "react-bootstrap";
import { loginAction } from "../actions/loginActions";
import { listStates, homeStatesList } from "../actions/stateActions";

const HeaderWhite = ({ history, match }) => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);
  const topNavItems = useSelector(state => state.layout.navItems);
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const wishList = useSelector(state => state.wishList);
  const { wishlistItems } = wishList;

  const userLogin = useSelector(state => state.userLogin);
  const [showModal, setShow] = useState(false);
  const log = useSelector(state => state.showLogin);
  const handleClose = () => {
    setShow(false);
    closeLoginPopup();
  };

  const handleShow = () => setShow(true);
  const { userInfo } = userLogin;
  const userId = userInfo?._id;

  // useEffect(() => {
  //   dispatch(fetchTopNav());
  // }, [dispatch]);
  const logOut = () => {
    dispatch(logout());
  };
  const [loading, setLoading] = useState(true);
  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const otpsend = "useSelector(state => state.sendOtp)";
  const resetpass = useSelector(state => state.resetPassword);
  const userRegister = useSelector(state => state.userRegister);
  // const alert = useAlert();
  useEffect(() => {
    dispatch(fetchTopNav()).then(() => setLoading(false));
  }, [dispatch]);

  const logoutHandler = () => {
    localStorage.removeItem("zipCode");
    localStorage.removeItem("selectedAddress");
    dispatch(logout());
  };
  useEffect(() => {
    // if (userId) {
    //   dispatch(getWishList(userId));
    // } else {
    //   history.push(`/`);
    // }
  }, [dispatch]);
  const [showRegisterModal, setRegisterShow] = useState(false);
  const [showForgetModal, setForgetShow] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(false);
  const [showForgetEmailModal, setForgetEmailShow] = useState(false);
  const [showOtpModal, setOtpModalShow] = useState(false);

  const [otp, setOtp] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [showSearchBarMobile, setShowSearchBarMobile] = useState(false);
  const [showMobilemenu, setShowMobilemenu] = useState(false);
  const [slug, setSlug] = useState("");
  const [isForget, setIsForget] = useState(false);
  const [showAddressModal, setAddressShow] = useState(false);

  const [logged, setLogged] = useState(false);
  const [disabledButton, setDisabled] = useState(false);
  const [disable, setDisabledReg] = useState(true);

  const [guest, setGuest] = useState(false);
  const [otpcheck, setOtpCheck] = useState(true);
  const [loginError, setLoginError] = useState(false);

  // const [activeLink, setActiveLink] = useState("active")
  let activeLink = "";
  function setActiveLink(e) {
    console.log(e.target.value, "link details");
    activeLink = "inactive";
  }

  const handleRegisterShow = () => setRegisterShow(true);
  const handleRegisterClose = () => setRegisterShow(false);
  const handleForgetClose = () => setForgetShow(false);
  const handleAddressShow = () => setAddressShow(true);
  const handleAddressClose = () => setAddressShow(false);
  const handleForgetEmailClose = () => {
    setForgetEmailShow(false);
  };
  const handleOtpClose = () => setOtpModalShow(false);

  const [otpvalue, setOtpValue] = useState(true);

  const handleForgetShow = () => setForgetShow(true);
  const handleOtpShow = () => setOtpModalShow(true);

  const handleForgetEmailShow = () => setForgetEmailShow(true);

  const taxListZipcode = useSelector(state => state.homeStateList);
  const { homeStatesListing } = taxListZipcode;
  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  let addressData = JSON.parse(localStorage.getItem("selectedAddress"));
  let postal_code = JSON.parse(localStorage.getItem("zipCode"));
  const [billingaddresses, setBillingaddresses] = useState(
    userInfo?.billingaddresses || []
  );

  useEffect(() => {
    if (userLogin.error) {
      // alert("Invalid Email Or Password!");
      setDisabled(false);
      setLoginError(true);
    }
  }, [userLogin]);
  useEffect(() => {
    if (userInfo?.billingaddresses?.length == 0) {
      localStorage.removeItem("selectedAddress");
    }
    setBillingaddresses(userInfo?.billingaddresses);
  }, [userInfo]);

  useEffect(() => {
    if (resetpass?.data?.email) {
      handleForgetClose();
      dispatch(login(email, password));

      setOtpCheck(true);
    } else if (resetpass?.data == "Wrong otp") {
      setOtpCheck(false);
      setEmail("");
      setPassword("");
    }
  }, [resetpass]);
  const submitHandler = e => {
    setDisabled(true);
    setLogged(true);
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (userId) {
      dispatch(getWishList(userId));
    }
    dispatch(fetchTopNav());
  }, [dispatch]);
  useEffect(() => {
    if (userInfo != null) {
      if (userInfo.isVerified && logged) {
        // alert.success("Logged In Successfully");
        setLogged(false);
        setDisabled(false);
        handleClose();
        closeLoginPopup();
        handleOtpClose();
      } else if (logged && userInfo != "Wrong otp") {
        // alert.info("Please Verify User");
        handleClose();
        setDisabled(false);
        // dispatch(sendOtp(email));
        handleOtpShow();
      } else if (userInfo == "Wrong otp") {
        setOtpModalShow(true);
      }
    } else if (userInfo == "wrong otp") {
      setOtpModalShow(true);
    }
  }, [userInfo]);

  const registerHandler = e => {
    setLogged(true);
    var hasErrors = false;

    if (validateForm) {
      e.preventDefault();
      if (
        firstName.length < 1 ||
        lastName.length < 1 ||
        phone.length < 1 ||
        email.length < 1 ||
        password.length < 1 ||
        confirmpassword.length < 1
      ) {
        alert("Input fields can not be empty!");

        hasErrors = true;
      } else if (password !== confirmpassword) {
        // alert.error("Passwords do not match!");
        alert("Passwords do not match!");
        setMessage("Passwords do not match");
      } else {
        // alert.info("Please Verify Otp!");
        alert("Please Verify Otp!");
        handleRegisterClose();
        dispatch(register(firstName, lastName, phone, email, password));
        handleOtpShow();
      }
    } else {
      // alert.error("Please Fill All The Fields Correctly!");
      alert("Please Fill All The Fields Correctly!");
    }
  };

  const addressHandler = e => {
    setLogged(true);
    var hasErrors = false;

    if (validateForm) {
      e.preventDefault();
      if (firstName.length < 1) {
        setError("firstName", "Please enter your first name");
        hasErrors = true;
      } else setError("firstName", null);

      if (lastName.length < 1) {
        setError("lastName", "Please enter your last name");
        hasErrors = true;
      } else setError("lastName", null);

      if (phone.length < 1) {
        setError("phone", "Please enter your phone number");
        hasErrors = true;
      } else setError("phone", null);

      if (!phone.match(phoneRegex)) {
        setError("phone", "Please enter valid phone number");
        hasErrors = true;
      } else setError("phone", null);

      if (email.length < 1) {
        setError("email", "Please enter your phone address");
        hasErrors = true;
      } else setError("email", null);

      if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
        setError("email", "Please enter a valid email address");
        hasErrors = true;
      } else setError("email", null);
      if (password !== confirmpassword) {
        alert.error("Passwords do not match!");
        setMessage("Passwords do not match");
      } else {
        alert.info("Please Verify Otp!");
        handleRegisterClose();
        dispatch(register(firstName, lastName, phone, email, password));
        handleOtpShow();
      }
    } else {
      alert.error("Please Fill All The Fields Correctly!");
    }
  };

  const forgetPassHandler = e => {
    e.preventDefault();
    // dispatch(sendOtp(email));
  };

  const verifyOtpHandler = e => {
    e.preventDefault();
    dispatch(verifyUser(email, otp));
  };
  const resetPassHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(email, otp, password));
    setOtpValue(true);
  };

  const setError = (fieldName, error) => {
    var update = {};
    update[fieldName + "Error"] = error;
    setErrorMessages(update);
  };

  const validateForm = () => {
    var hasErrors = false;

    if (firstName.length < 1) {
      setError("firstName", "Please enter your first name");
      hasErrors = true;
    } else setError("firstName", null);

    if (lastName.length < 1) {
      setError("lastName", "Please enter your last name");
      hasErrors = true;
    } else setError("lastName", null);

    if (phone.length < 1) {
      setError("phone", "Please enter your phone number");
      hasErrors = true;
    } else setError("phone", null);

    if (!phone.match(phoneRegex)) {
      setError("phone", "Please enter valid phone number");
      hasErrors = true;
    } else setError("phone", null);

    if (email.length < 1) {
      setError("email", "Please enter your phone address");
      hasErrors = true;
    } else setError("email", null);

    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      setError("email", "Please enter a valid email address");
      hasErrors = true;
    } else setError("email", null);

    return !hasErrors;
  };
  // const [phone, setPhone] = useState('')
  const [phoneError, setphoneError] = useState(null);

  const phoneValidation = e => {
    const val1 = e.target.value.trim();
    var pattern = new RegExp(/^[0-9\b]+$/);
    if (val1.length < 1) {
      setphoneError("Phone number can not be Empty!");
      setDisabledReg(true);
    } else if (!pattern.test(val1)) {
      setphoneError("Please enter only numbers");
      setDisabledReg(true);
    } else if (val1.length < 10) {
      setphoneError("Phone number can not be less then 10 digits");
      setDisabledReg(true);
    } else {
      setPhone(val1);
      setDisabledReg(false);
      setphoneError("");
    }
  };
  const [emailError, setemailError] = useState(null);

  const emailValidation = e => {
    console.log(e.target.value);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    const val1 = e.target.value.trim();
    if (val1.length < 1) {
      setemailError("Email can not be Empty!");
      setDisabled(true);
    } else if (!pattern.test(val1)) {
      setemailError("Please enter valid email address.");
      setDisabled(true);
    } else {
      setEmail(val1);
      setDisabled(false);
      setemailError("");
    }
  };
  const SearchBarMobile = () => {
    if (showSearchBarMobile == true) {
      setShowSearchBarMobile(false);
    } else setShowSearchBarMobile(true);
  };

  const closeLoginPopup = () => {
    dispatch(loginAction(false));
  };

  const mobileMenu = () => {
    if (showMobilemenu == true) {
      setShowMobilemenu(false);
    } else setShowMobilemenu(true);
  };

  const responseGoogle = response => {};
  const onSuccess = res => {
    const data = res.profileObj;
    dispatch(
      register(data.givenName, data.familyName, "", data.email, data.googleId)
    );
    handleRegisterClose();
  };
  const googleLogin = res => {
    const data = res.profileObj;
    dispatch(login(data.email, data.googleId));
    handleClose();
  };
  const facebookSignup = response => {
    dispatch(
      register(
        response.first_name,
        response.last_name,
        "",
        response.email,
        response.userID
      )
    );
    handleRegisterClose();
  };
  const facebookLogin = response => {
    dispatch(login(response.email, response.userID));
    handleClose();
  };
  const checkoutHandler = () => {
    setGuest(true);
    closeLoginPopup();
    history.push("/shipping");
  };
  useEffect(() => {
    if (otpsend?.data == "otp send" && isForget) {
      alert.info("Otp Sent Successfully!");
      handleForgetEmailClose();
      handleForgetShow();
      setDisabled(false);
    } else if (otpsend?.data == "user not exist") {
      alert.info("User does not exist!");
      setDisabled(false);
    }
  }, [otpsend]);
  const sendOtpHandler = () => {
    setIsForget(true);
    setDisabled(true);
  };

  const defaultBillingAddress = (userId, addressId, type) => {
    const newBilAddress = [...billingaddresses];
    var newAddress = [];
    newBilAddress.map(addres => {
      if (addres.id == addressId) {
        localStorage.setItem("selectedAddress", JSON.stringify(addres));
        addres.defaultAddress = true;
        newAddress.push(addres);
      } else {
        addres.defaultAddress = false;
        newAddress.push(addres);
      }
    });
    const userData = JSON.parse(localStorage.userInfo);

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: userData });
    setBillingaddresses(newAddress);
  };

  useEffect(() => {
    if (!addressData) {
      let billaddrss = userInfo?.billingaddresses?.map(addres => {
        if (addres.defaultAddress) {
          localStorage.setItem("selectedAddress", JSON.stringify(addres));
        } else {
          localStorage.setItem(
            "selectedAddress",
            JSON.stringify(userInfo?.billingaddresses[0])
          );
        }
      });
    } else {
      let billAdd = userInfo?.billingaddresses?.map(data => {
        if (data._id == addressData._id) {
          localStorage.setItem("selectedAddress", JSON.stringify(data));
        }
      });
    }
  }, [userInfo]);

  function checkTax(zipCode) {
    var zipLen = zipCode?.toString().length;
    if (zipLen < 6) {
      setPostalCode(zipCode);
      dispatch(homeStatesList(zipCode));
    }
    if (zipLen == 5) {
      dispatch(homeStatesList(zipCode));
    }
  }

  useEffect(() => {
    if (homeStatesListing?.length != 0 && homeStatesListing) {
      setZipCodeError(false);
    } else {
      setZipCodeError(true);
    }
  }, [homeStatesListing]);

  const postalCodeHandler = e => {
    localStorage.setItem("zipCode", postalCode);
    handleAddressClose();
  };

  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");
  const [visibility, setVisibility] = useState(false);

  function showDivhandler(e) {
    setVisibility(true);
  }
  function hideDivhandler(e) {
    setVisibility(false);
  }

  return (
    <>
      <Navbar
        bg="light"
        variant="light"
        expand="xl"
        className="boombolt-nav-white py-1 sticky-top"
      >
        <Navbar.Brand href="/" className="nb-brand">
          <img
            alt=""
            src={"/images/fox-black-2.png"}
            // width="70"
            // height="70"
            className="d-inline-block align-top img-fluid img-responsive "
          />
          <img
            src={"/images/boombolt-black-logo-text.png"}
            className="d-inline-block align-middle img-logo-text img-fluid img-responsive "
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="navbar-nav w-100">
            <Nav className="pr-2 m-auto margin-custom-auto hover-border-img topNav">
              <ul className="menu">
                {/* home  */}
                <li className="menu-li-1">
                  <a
                    href="/"
                    className={`menu-li1-a ${activeLink}`}
                    onClick={setActiveLink}
                  >
                    Home
                  </a>
                </li>
                {topNavItems &&
                  topNavItems.length > 0 &&
                  topNavItems.map(navItem => {
                    return (
                      <>
                        <li className="menu-li-1 topNav" key={navItem.id}>
                          <a
                            href={"/productcatalouge/" + navItem.slug}
                            className={`menu-li1-a ${
                              splitLocation[2] === navItem.slug ? "active" : ""
                            }`}
                          >
                            {navItem.title == "new" ? (
                              <img
                                src={navItem.image}
                                height="20"
                                width="30"
                              ></img>
                            ) : (
                              navItem.title
                            )}
                          </a>
                          <ul>
                            <li className="submenu-headerWhite">
                              {navItem.childCategories.map((navdata, i) => (
                                // <a href={'/category/${navdata.slug}'} className="sublink-img-no-sign pl-0">
                                <a
                                  href={"/productcatalouge/" + navdata.slug}
                                  // onClick={isActive}
                                  className={`sublink-img-no-sign pl-0 ${
                                    splitLocation[2] === navdata.slug
                                      ? "active"
                                      : ""
                                  }`}
                                  key={navdata.id}
                                >
                                  <span className="left-line-dd"></span>
                                  <span className="left-line-dd-txt pl-2">
                                    {navdata.title}
                                  </span>
                                </a>
                              ))}
                            </li>
                          </ul>
                        </li>
                      </>
                    );
                  })}

                <li
                  className="menu-li-1 mr-lg-5"
                  onMouseOver={showDivhandler}
                  onMouseLeave={hideDivhandler}
                  onClick={showDivhandler}
                >
                  <a href="#" className="menu-li1-a">
                    <img src={"/images/sale1.png"} />
                  </a>
                </li>

                <SearchBox />

                {userInfo?._id && (
                  <li className="menu-li-left">
                    {/* <span>{userInfo?.firstName}</span> */}
                    <a href="#" className="menu-li1-a">
                      <img src={"/images/user.png"} />
                    </a>
                    <ul className="right-dd-open userAcountDetail">
                      <li>
                        <a
                          href="/address-book"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            address book
                          </span>
                        </a>
                      </li>
                      {/* <li>
                        <a href="/editDetail" className="sublink-img-no-sign pl-0">
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            edit profile
                          </span>
                        </a>
                      </li> */}
                      <li>
                        <a
                          href="/dashboard"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">profile</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/wishlist"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            my wishlist
                            {wishList?.products?.length > 0 ? (
                              <span className="cus-badge badge-pill badge-success">
                                {" "}
                                {wishList.products.length}
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/allOrders"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            my order
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="sublink-img-no-sign pl-0">
                          <span className="left-line-dd"></span>
                          <span
                            onClick={logOut}
                            className="left-line-dd-txt pl-2"
                          >
                            log out
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                )}

                {!userInfo?._id && (
                  <li className="menu-li-1">
                    <a href="/login" className="menu-li1-a">
                      Login
                    </a>
                  </li>
                )}
                <li className="menu-li-left">
                  <a href="/cart" className="menu-li1-a">
                    <img src={"/images/basket.png"} />
                    {cartItems.length > 0 ? (
                      <span className="cus-badge badge badge-pill badge-success">
                        {cartItems.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </a>
                </li>
                <li className="menu-li-left">
                  {/* <li className="menu-li">
              <SearchBox />
            </li>
            {/* <li className="menu-li-left"> */}
                  <a href="/wishlist" className="menu-li1-a">
                    <img src={"/images/wishlist.png"} height="22" width="25" />
                    {wishList?.products?.length > 0 ? (
                      <span className="cus-badge badge badge-pill badge-success">
                        {wishList.products.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </a>
                </li>
              </ul>
            </Nav>
            {/* ======================= nav for ipad and ipad pro -============================== */}
            <Nav className="pr-2 m-auto margin-custom-auto text-left hover-border-img d-none naviPadUi">
              <ul className="menu">
                {/* home  */}
                <li className="menu-li-1">
                  <a href="/" className="menu-li1-a text-white">
                    Home
                  </a>
                </li>
                {/* new arrival  */}
                {topNavItems &&
                  topNavItems.length > 0 &&
                  topNavItems.map(navItem => {
                    return (
                      <>
                        <li key={navItem.id} className="menu-li-1">
                          <a
                            className={`menu-li1-a ${
                              splitLocation[2] === navItem.slug ? "active" : ""
                            }`}
                          >
                            {/* new arrival */}
                            {navItem.title == "new" ? (
                              <img
                                src={navItem.image}
                                height="20"
                                width="30"
                              ></img>
                            ) : (
                              navItem.title
                            )}
                          </a>
                          <ul>
                            <li>
                              {navItem.childCategories.map((navdata, i) => (
                                // <a href={'/category/${navdata.slug}'} className="sublink-img-no-sign pl-0">
                                <a
                                  href={"/productcatalouge/" + navdata.slug}
                                  className={`sublink-img-no-sign pl-0 ${
                                    splitLocation[2] === navdata.slug
                                      ? "active"
                                      : ""
                                  }`}
                                  key={navdata.id}
                                >
                                  <span className="left-line-dd"></span>
                                  <span className="left-line-dd-txt pl-2">
                                    {navdata.title}
                                  </span>
                                </a>
                              ))}
                            </li>
                          </ul>
                        </li>
                      </>
                    );
                  })}

                <li
                  className="menu-li-1 mr-lg-5"
                  onMouseOver={showDivhandler}
                  onMouseLeave={hideDivhandler}
                  onClick={showDivhandler}
                >
                  <a href="#" className="menu-li1-a">
                    <img src={"/images/sale1.png"} />
                  </a>
                </li>
                {/* </ul> */}
                {/* <ul className="menu mr-sm-2 ml-lg-5"> */}
                <SearchBox />

                {userInfo && (
                  <li className="menu-li-left ">
                    <a href="#" className="menu-li1-a">
                      <img src={"/images/user.png"} />
                    </a>
                    <ul className="left-dd-open">
                      <li>
                        <a
                          href="address-book"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            address book
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/dashboard"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">profile</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/wishlist"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            my wishlist
                            {wishList?.products?.length > 0 ? (
                              <span className="cus-badge badge-pill badge-success">
                                {/* {" "} */}
                                {wishList.products.length}
                              </span>
                            ) : (
                              <span></span>
                            )}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="/allOrders/"
                          className="sublink-img-no-sign pl-0"
                        >
                          <span className="left-line-dd"></span>
                          <span className="left-line-dd-txt pl-2">
                            my order
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="sublink-img-no-sign pl-0">
                          <span className="left-line-dd"></span>
                          <span
                            onClick={logOut}
                            className="left-line-dd-txt pl-2"
                          >
                            log out
                          </span>
                        </a>
                      </li>
                    </ul>
                  </li>
                )}
                {!userInfo && (
                  <li className="menu-li-1">
                    <a href="/login" className="menu-li1-a ">
                      Login
                    </a>
                  </li>
                )}
                <li className="menu-li-left">
                  <a href="/cart" className="menu-li1-a">
                    <img src={"/images/basket.png"} />
                    {cartItems.length > 0 ? (
                      <span className="cus-badge badge badge-pill badge-success">
                        {cartItems.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </a>
                </li>
                <li className="menu-li-left">
                  <a href="/wishlist" className="menu-li1-a">
                    <img src={"/images/wishlist.png"} height="22" width="25" />
                    {wishList?.products?.length > 0 ? (
                      <span className="cus-badge badge badge-pill badge-success">
                        {wishList.products.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </a>
                </li>
              </ul>
            </Nav>

            {/* ============ mobile menu====================================================== */}
            <Nav className="pr-2 m-auto margin-custom-auto hover-border-img w-100 navMobileUi">
              <ul className="menu menu1">
                <li className="menu-li-1 homeTab">
                  <a
                    href="/"
                    className={`menu-li1-a ${activeLink}`}
                    onClick={setActiveLink}
                  >
                    Home
                  </a>
                </li>
                <br />
                <br />

                {topNavItems &&
                  topNavItems.length > 0 &&
                  topNavItems.map((navItem, index) => {
                    return (
                      <>
                        <div key={index} className="dropdown">
                          <button className="dropButton menu-li-1 ">
                            {navItem.title == "new" ? (
                              <img
                                src={navItem.image}
                                height="20"
                                width="30"
                              ></img>
                            ) : (
                              navItem.title
                            )}
                          </button>
                          <div className="dropdown-content">
                            {navItem.childCategories.map((navdata, i) => (
                              // <a href={'/category/${navdata.slug}'} className="sublink-img-no-sign pl-0">
                              <a
                                href={"/productcatalouge/" + navdata.slug}
                                key={navdata.id}
                              >
                                <span className="left-line-dd"></span>
                                <span className="left-line-dd-txt pl-2">
                                  {navdata.title}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })}
                <li
                  className="menu-li-1 mr-lg-5"
                  onMouseOver={showDivhandler}
                  onMouseLeave={hideDivhandler}
                  onClick={showDivhandler}
                >
                  <a href="#">
                    <img src={"/images/sale1.png"} />
                  </a>
                </li>
                <br />
                {userInfo?._id && (
                  <div className="dropdown py-2 mt-3">
                    <button className="dropButton menu-li-1">
                      <a href="#">
                        {/* <img src={"/images/user.png"} /> */}
                        <span>my account </span>
                      </a>
                    </button>
                    <div className="dropdown-content">
                      <a
                        href="address-book"
                        className="sublink-img-no-sign pl-0"
                      >
                        <span className="left-line-dd"></span>
                        <span className="left-line-dd-txt pl-2">
                          address book
                        </span>
                      </a>

                      <a href="/dashboard" className="sublink-img-no-sign pl-0">
                        <span className="left-line-dd"></span>
                        <span className="left-line-dd-txt pl-2">profile</span>
                      </a>

                      <a href="/wishlist" className="sublink-img-no-sign pl-0">
                        <span className="left-line-dd"></span>
                        <span className="left-line-dd-txt pl-2">
                          my wishlist
                          {wishList?.products?.length > 0 ? (
                            <span className="cus-badge badge-pill badge-success">
                              {" "}
                              {wishList.products.length}
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </span>
                      </a>
                      <a href="/allOrders" className="sublink-img-no-sign pl-0">
                        <span className="left-line-dd"></span>
                        <span className="left-line-dd-txt pl-2">my order</span>
                      </a>
                      <a href="#" className="sublink-img-no-sign pl-0">
                        <span className="left-line-dd"></span>
                        <span
                          onClick={logOut}
                          className="left-line-dd-txt pl-2"
                        >
                          log out
                        </span>
                      </a>
                    </div>
                  </div>
                )}
                {!userInfo?._id && (
                  <div className="py-2 mt-3">
                    <button className="loginMenu">
                      <a href="/login">login</a>
                    </button>
                  </div>
                )}

                <li className="menu-li-left cartIconMobileUi">
                  <a href="/cart" className="menu-li1-a">
                    <img src={"/images/basket.png"} />
                    {cartItems.length > 0 ? (
                      <span className="cus-badge badge badge-pill badge-success">
                        {cartItems.length}
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </a>
                </li>
                <br />
                <span className="searchbutton">
                  <SearchBox />
                </span>
              </ul>
            </Nav>
            {/* ============mobile menu====================================================== */}

            <div
              className={`level-2 ${visibility ? "d-block" : "d-none"}`}
              onMouseOver={showDivhandler}
              onMouseLeave={hideDivhandler}
            >
              <div className="row p-5">
                <div className="col-md-4 closeDiv">
                  <button
                    type="button"
                    className="closeBtn1"
                    onClick={hideDivhandler}
                  >
                    X
                  </button>
                </div>
                <div className="col-md-4 ml-md-5 saleDropDown">
                  <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-8">
                      <div className="left text-center saleUpTo">
                        <h1 className="text-white pt-120">sale</h1>
                        <h5 className="text-white pt-4">UP TO</h5>
                        <h2 className="text-white">70% OFF!</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 text-left middle_sale Productdetail">
                  <h5>ALL SALE</h5>

                  {topNavItems &&
                    topNavItems.length > 0 &&
                    topNavItems.map((navItem, index) => {
                      return (
                        <ul key={index}>
                          {navItem.childCategories.map((navdata, i) => (
                            <li key={i}>
                              {navdata.products.map((product, i) => {
                                return (
                                  <p key={i}>
                                    {product.sale_include && (
                                      <a
                                        key={product.id}
                                        href={"/ProductDetail/" + product.slug}
                                      >
                                        {product.name}
                                      </a>
                                    )}
                                  </p>
                                );
                              })}
                            </li>
                          ))}
                        </ul>
                      );
                    })}
                </div>
                <div className="col-md-4 text-left">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="right-sale">
                        <h5>OFFERS</h5>
                        <p className="my-3 pb-2">
                          <a>
                            <img
                              src={"/images/sale/next_day_delivery.svg"}
                            ></img>
                            <span className="right_sale_span">
                              FREE NEXT DAY DELIVERY** USE CODE: SAVE
                            </span>
                          </a>
                        </p>
                        <p className="my-3 pb-2">
                          <a>
                            <img src={"/images/sale/percentage.svg"}></img>
                            <span className="right_sale_span">
                              UP TO 70% OFF SALE!
                            </span>
                          </a>
                        </p>
                        <p className="my-3 pb-2">
                          <a>
                            <img src={"/images/sale/proposition.svg"}></img>
                            <span className="right_sale_span">
                              {" "}
                              STUDENT DISCOUNT NOW 40% OFF
                            </span>
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-4 closeButton">
                      <button
                        type="button"
                        className="closeBtn"
                        onClick={hideDivhandler}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Navbar>
      {/* <div className="d-inline">
          <ul className="menu mr-sm-2">


          </ul> */}
      <Modal
        size="lg"
        show={showModal || log.products.payload}
        onHide={handleClose}
        className="login-modal-main loginPopup-modal"
      >
        <Modal.Header
          closeButton
          className="background-image loginPopup"
        ></Modal.Header>
        <Modal.Body className="login-modal-popup background-image loginPopup">
          <div className="container">
            <div className="row h-100">
              <div className="col-md-4 login-bg-color">
                <div className="pl-3 mobile-page-loginpopup">
                  <div className="login-text">
                    <h1 className="login-heading">Login</h1>
                    <span className="login-heading-content1 pr-3">
                      Get access to your Orders, Wishlist and more
                    </span>
                    {/* <div className="mt-4">
                      <p className="login-heading-content2">
                        - Checkout faster
                      </p>
                      <p className="login-heading-content2">
                        - Store multiple address
                      </p>
                      <p className="login-heading-content2">- Track order</p>
                    </div> */}
                  </div>
                  {/* <div className="login-img-div">
                    <img
                      src="/images/BOOMBOLT-White-Logo.png"
                      className="login-img"
                    />
                  </div> */}
                </div>
              </div>
              <div className="col-md-8 mt-3">
                <Form onSubmit={submitHandler}>
                  <div className="login-form-maindiv pl-2">
                    <div className="login-form pt-3">
                      <label className="login-form-label">
                        Current customer login:
                      </label>
                      <div className="form-group">
                        <label htmlFor="usr" className="login-form-label">
                          Your Email:
                        </label>
                        <input
                          type="text"
                          className="form-control login-input-box"
                          id="usr"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd" className="login-form-label">
                          Your Password:
                        </label>
                        <input
                          type="password"
                          className="form-control login-input-box"
                          id="pwd"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                        {loginError && (
                          <span className="mandatory">
                            Invalid Email Or password!
                          </span>
                        )}
                      </div>
                      <div className="login-btn-div mt-5 Login-Button">
                        {disabledButton ? (
                          <button
                            className="login-btn mr-2"
                            disabled={disabledButton}
                          >
                            Submiting
                          </button>
                        ) : (
                          <button
                            className="login-btn mr-2"
                            disabled={disabledButton}
                          >
                            Login
                          </button>
                        )}

                        <a
                          className="fgt-pwd-txt cursor-pointer-link mt-2 mt-md-0 frgt-password"
                          onClick={() => {
                            closeLoginPopup();
                            handleClose();
                            handleForgetEmailShow();
                          }}
                        >
                          Forget Your Password?
                        </a>
                      </div>

                      {/* <div className="mt-top text-center text-lg-left">
                        <span className="login-form-bluetxt">
                          New to BOOMBOLT Technologies?
                        </span>
                        <a
                          className="create-account-link"
                          onClick={() => {
                            closeLoginPopup();
                            handleClose();
                            handleRegisterShow();
                          }}
                        >
                          Create an account
                        </a>
                      </div> */}
                      <div className="row mt-4">
                        <div className="col-md-12 text-center">
                          <div className="row">
                            <div className="col-md-3 hr">
                              <hr />
                            </div>
                            <div className="col-md-6">
                              <p className="login-or-text NewToBoomBolt">
                                New to BoomBolt?
                              </p>
                            </div>
                            <div className="col-md-3 hr">
                              <hr />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 mb-3 text-center text-lg-left">
                        <span
                          type="button"
                          className="btn btn-primary btn-block create-account-link"
                          onClick={() => {
                            closeLoginPopup();
                            handleClose();
                            handleRegisterShow();
                          }}
                        >
                          Create a New Account
                        </span>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* signup-modal */}
      <Modal
        size="lg"
        show={showRegisterModal}
        onHide={handleRegisterClose}
        className="login-modal-main loginPopup-modal"
      >
        <Modal.Header
          closeButton
          className="background-image loginPopup"
        ></Modal.Header>
        <Modal.Body className="login-modal-popup background-image">
          <Form onSubmit={registerHandler}>
            <div className="container ">
              <div className="row h-100">
                <div className="col-md-5 col-lg-4 login-bg-color">
                  <div className="pl-lg-2 register-design">
                    <div className="login-text">
                      <h2 className="login-heading">
                        Looks like you're new here!
                      </h2>
                      <span className="login-heading-content1 pr-3">
                        Sign up with your email to get started
                      </span>
                      <div className="create-new-account-imgdiv">
                        <img
                          src="/images/BOOMBOLT-White-Logo.png"
                          className="create-account-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-7 col-lg-8 mt-2">
                  <div className="login-form-maindiv">
                    {/* <div className="login-closebtn text-right">
                      <i className="fas fa-times" aria-hidden="true"></i>
                    </div> */}
                    <div className="login-form">
                      <h3 className="create-accout-heading">Create Account</h3>
                      <div className="form-group">
                        <label htmlFor="usr" className="login-form-label">
                          First Name:
                        </label>
                        <input
                          type="text"
                          className="form-control login-input-box"
                          id="fname"
                          value={firstName}
                          onChange={e => setfirstName(e.target.value)}
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd" className="login-form-label">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          className="form-control login-input-box"
                          id="lname"
                          value={lastName}
                          onChange={e => setlastName(e.target.value)}
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd" className="login-form-label">
                          Mobile Number:
                        </label>
                        <input
                          type="number"
                          className="form-control login-input-box"
                          id="mobile"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          onBlur={phoneValidation}
                          placeholder="Mobile Number"
                        />
                        {phoneError && (
                          <p className="text-danger">* {phoneError}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd" className="login-form-label">
                          Email:
                        </label>
                        <input
                          type="text"
                          className="form-control login-input-box"
                          id="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          onBlur={emailValidation}
                          placeholder="Email Address"
                        />
                        {emailError && (
                          <p className="text-danger">* {emailError}</p>
                        )}
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd" className="login-form-label">
                          Password:
                        </label>
                        <input
                          type="password"
                          className="form-control login-input-box"
                          id="pwd"
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pwd" className="login-form-label">
                          Confirm Password:
                        </label>
                        <input
                          type="password"
                          className="form-control login-input-box"
                          id="cnf-pwd"
                          value={confirmpassword}
                          onChange={e => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                        />
                      </div>
                      <div className="login-btn-div mt-4 continueBtn">
                        <button
                          className="continue-btn"
                          disabled={disable}
                          onClick={() => {
                            validateForm();
                          }}
                        >
                          Continue
                        </button>
                      </div>
                      <div className="mt-top-create my-4 continueBtn">
                        <span className="login-greytxt mr-2">
                          Already have an account?
                        </span>
                        <a
                          className="create-page-login-link text-success"
                          onClick={() => {
                            handleShow();
                            handleRegisterClose();
                          }}
                        >
                          Login
                        </a>
                      </div>
                      {/* <div className="mt-top-create my-4">
                        <span className="login-greytxt">Social login?</span>
                        <GoogleLogin
                          clientId="1057967771930-jq1v8bdn95ggijtsqab957hult7igsrm.apps.googleusercontent.com"
                          buttonText="Login"
                          onSuccess={onSuccess}
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                        <FacebookLogin
                          appId="700920513937958"
                          autoLoad={false}
                          fields="first_name,last_name,email,picture"
                          callback={facebookSignup}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* address modal */}
      <Modal
        size="md"
        show={showAddressModal}
        onHide={handleAddressClose}
        className="login-modal-main"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="login-modal-popup">
          {billingaddresses?.length > 0 && (
            <Form onSubmit={addressHandler}>
              <div className="container">
                <div className="row h-100">
                  <div className="col-md-2 col-lg-2 "></div>
                  <div className="col-md-7 col-lg-7 mt-2">
                    {billingaddresses?.length > 0 &&
                      billingaddresses.map(address => (
                        <div
                          className="col-md-10 my-4 col-12 bg-c4c4c4 py-3 address-book-card address-book-card-header"
                          key={address?._id}
                        >
                          <div
                            className="row"
                            onClick={() =>
                              defaultBillingAddress(
                                userInfo?._id,
                                address?._id,
                                "SET_DEFAULT"
                              )
                            }
                          >
                            <div className="col-md-1 text-center">
                              {
                                <label className="checkbox-button">
                                  <input
                                    type="checkbox"
                                    className="checkbox-button__input check"
                                    id="choice1-1"
                                    name="choice1"
                                    checked={
                                      address?._id == addressData?._id
                                        ? true
                                        : false
                                    }
                                  />
                                  <span className="checkbox-button__control"></span>
                                </label>
                              }
                            </div>
                            <div className="col-md-11">
                              <p className="address-book-cart-text">
                                {address?.firstname} {address?.lastname}{" "}
                                {address?.city} <br></br>
                                {address?.postalCode}
                                <br />
                                {address?.state} {address?.streetaddress[0]},{" "}
                                {address?.country}
                                <br />
                                {address?.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    {billingaddresses?.length > 0 && (
                      <a href="/address-book">
                        Add an address or pick-up point
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Form>
          )}
          {!billingaddresses?.length > 0 && (
            <>
              <div className="row no-gutters">
                <div className="col-12 location bg-gray py-3 px-4 font-weight-bold">
                  Choose Your Location
                </div>
              </div>
              <div className="row px-4">
                <div className="col-12 py-2 postal-code-txt">
                  Select a delivery location to see product availability and
                  delivery options
                </div>
              </div>
              <div className="row px-4">
                <div className="col-12">
                  <button
                    className="login-btn w-100 btn-pin-code-padding"
                    onClick={() => {
                      handleShow();
                      handleAddressClose();
                    }}
                  >
                    Login User
                  </button>
                </div>
              </div>
              <div className="login-form-maindiv">
                <Form onSubmit={e => postalCodeHandler()} className="">
                  <div className="login-form py-2">
                    <div className="form-group mb-0">
                      <div className="form-row px-4 pb-2">
                        <div className="col-12 text-center py-2">
                          <div className="div-line "></div>
                          <span
                            htmlFor="usr"
                            className="login-form-label postal-code-txt span-on-line"
                          >
                            <span className="bg-white px-2">
                              Enter Postal Code
                            </span>
                          </span>
                        </div>
                        <div className="col-8">
                          <input
                            type="number"
                            className="form-control login-input-box"
                            id="otp"
                            placeholder="Enter PostalCode"
                            minLength="5"
                            maxLength="5"
                            value={postalCode}
                            onChange={e => checkTax(e.target.value)}
                          />
                        </div>
                        <div className="col-4 align-self-end">
                          <button
                            className="login-btn w-100 btn-pin-code-padding"
                            disabled={zipCodeError ? true : false}
                          >
                            Submit
                          </button>
                        </div>
                      </div>

                      {postalCode != "" && zipCodeError ? (
                        <span className="mandatory">Invalid PostalCode!</span>
                      ) : (
                        <span></span>
                      )}
                    </div>

                    {/* <div className="login-btn-div py-2">
                        <div className="row px-4">
                          <div className="col-12">
                            <button
                              className="login-btn"
                              disabled={zipCodeError ? true : false}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>*/}
                  </div>
                </Form>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      {/* </div> */}
    </>
  );
};
export default withRouter(HeaderWhite);
