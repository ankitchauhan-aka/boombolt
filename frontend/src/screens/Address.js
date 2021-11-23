import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import HeaderWhite from "../components/HeaderWhite";
import {homeStatesList } from "../actions/stateActions";

import {
  saveBillingAddress,
  updateBillingAddress
} from "../actions/cartActions";
const Address = ({ match, history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const taxListZipcode = useSelector(state => state.homeStateList);
  const { homeStatesListing } = taxListZipcode;

  const [email, setEmail] = useState(userInfo.email ? userInfo.email : "");
  const [firstname, setFirstName] = useState(
    userInfo.firstName ? userInfo.firstName : ""
  );
  const [lastname, setLastName] = useState(
    userInfo.lastName ? userInfo.lastName : ""
  );
  const [zipCodeError, setZipCodeError] = useState(false);

  const [streetaddress, setStreetAddress] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming"
  ];
  const [country, setCountry] = useState("USA");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState(userInfo.phone ? userInfo.phone : "");
  const [userId, setUserId] = useState(userInfo._id ? userInfo._id : "");

  const submitHandler = async e => {
    var id = match.params.addressId;
    if (!id) {
      e.preventDefault();
      await dispatch(
        saveBillingAddress({
          firstname,
          lastname,
          email,
          streetaddress,
          state,
          city,
          postalCode,
          country,
          phone,
          userId
        })
      );
      // window.location.href("/address-book");
      history.push("/address-book");
    } else {
      e.preventDefault();
      await dispatch(
        updateBillingAddress(
          {
            firstname,
            lastname,
            email,
            streetaddress,
            state,
            city,
            postalCode,
            country,
            phone,
            userId
          },
          userInfo._id,
          id
        )
      );
      // window.location.href("/address-book");
      history.push("/address-book");
    }
  };
  function checkTax(zipCode) {
    var zipLen = zipCode?.toString().length;
    if (zipLen < 6) {
      setPostalCode(zipCode);
      dispatch(homeStatesList(zipCode));
    }
    if (zipLen === 5) {
      dispatch(homeStatesList(zipCode));
    }
  }

  useEffect(() => {
    if (homeStatesListing?.length !== 0 && homeStatesListing) {
      setZipCodeError(false);
    } else {
      setZipCodeError(true);
    }
  }, [homeStatesListing]);

  useEffect(() => {
    var id = match.params.addressId;
    const billingaddresses = JSON.parse(localStorage.userInfo).billingaddresses;
    if (billingaddresses) {
      billingaddresses.map(address => {
        if (address._id === id) {
          setFirstName(address.firstname);
          setLastName(address.lastname);
          setEmail(address.email);
          setPhone(address.phone);
          setCity(address.city);
          setCountry(address.country);
          setState(address.state);
          setPostalCode(address.postalCode);
          setStreetAddress(address.streetaddress);
        }
      });
    }
  }, []);

  const handleSelect = e => {
    setState(e);
  };
  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-3">
              <p className="text-white mb-0 fs-16">address</p>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-md-5">
        <div className="container-fluid">
          <div className="row pt-4">
            <div className="col-md-12 text-center">
              <div>
                <img
                  src={"/images/sign-bag-green.png"}
                  className="home-location"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/home-location-red.png"}
                  className="home-location active"
                />
                <span className="clr-sku shop-border mx-1"></span>
                <img
                  src={"/images/sign_rs-green.png"}
                  className="home-location"
                />
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-4 offset-md-8 pl-4">
              <div className="shield-li-div">
                <ul className="list-group list-group-horizontal shield-li">
                  <li className="list-group-item">
                    <img src={"/images/shield.png"} className="shield-img" />
                  </li>
                  <li className="list-group-item align-self-center">
                    <p className="safe-and-secure mb-0">
                      safe and secure Payments. Easy returns.
                    </p>
                    <p className="safe-and-secure mb-0">
                      100% Authentic product
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
          <div className="row pb-4 pt-3">
            <div className="col-md-12">
              <div className="row pt-4 pb-3">
                <div className="col-lg-3"></div>
                <div className="col-lg-6 col-md-8 align-self-center pl-0">
                  <h3 className="clr-sku mb-0 font-weight-normal text-center selectDeliverAddress">
                    select delivery address
                  </h3>
                </div>
                <div className="col-lg-3 col-md-4 col-10 text-right pr-0 addNewAddress">
                  <div className="position-relative pink-bg-btn2 mt-2">
                    <a
                      href=""
                      className="addnew-address-btn all-event1 brder-lr-pink edgtf-btn edgtf-btn-gapped_outline"
                    >
                      <span className="edgtf-btn-text text-pink">
                        add new address
                      </span>
                      <span
                        className="edgtf-gapped-border edgtf-gapped-border-top"
                        style={{
                          background:
                            "linear-gradient(to right, rgb(234 71 105) 0%, rgb(234 71 105) 85%, transparent 85%, transparent 89%, rgb(234 71 105) 89%, rgb(234 71 105) 100%)"
                        }}
                      ></span>
                      <span
                        className="edgtf-gapped-border edgtf-gapped-border-bottom"
                        style={{
                          background:
                            "linear-gradient(to right, rgb(234 71 105) 0%, rgb(234 71 105) 15%, transparent 15%, transparent 19%, rgb(234 71 105) 19%, rgb(234 71 105) 100%)"
                        }}
                      ></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-4">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 col-md-12 AddressForm">
              <div className="row brdr-form pt-3 pb-4">
                <div className="col-lg-12 col-md-12">
                  <p className="clr-black fs-16">billing details</p>
                  <form onSubmit={submitHandler}>
                    <div className="row cus-textbox pb-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="fname">first name</label>
                          <input
                            type="name"
                            className="form-control form-control-sm"
                            id="fname"
                            value={firstname}
                            onChange={e => {
                              setFirstName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="lname">last name</label>
                          <input
                            type="name"
                            className="form-control form-control-sm"
                            id="lname"
                            value={lastname}
                            onChange={e => {
                              setLastName(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row cus-textbox pb-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="email">email</label>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            id="email"
                            value={email}
                            onChange={e => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="phone">Phone number</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="phone"
                            value={phone}
                            onChange={e => {
                              setPhone(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row cus-textbox pb-2">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="address">
                            address (area and street)
                          </label>
                          <textarea
                            className="form-control form-control-sm"
                            rows="5"
                            id="comment"
                            value={streetaddress}
                            onChange={e => {
                              setStreetAddress(e.target.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="row cus-textbox pb-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="city">city / district / town</label>
                          <input
                            type="name"
                            className="form-control form-control-sm"
                            id="city"
                            value={city}
                            onChange={e => {
                              setCity(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="state">state</label>
                          <Dropdown onSelect={e => setState(e)}>
                            <Dropdown.Toggle
                              variant="success"
                              id="dropdown"
                              className="state-drpdwn us-states state-dropDownButton"
                            >
                              {state}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="stateList">
                              {states.map(state => (
                                <Dropdown.Item eventKey={state}>
                                  {state}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                          {/* <input
                            type="name"
                            className="form-control form-control-sm"
                            id="state"
                            value={state}
                            onChange={e => {
                              setState(e.target.value);
                            }}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="row cus-textbox pb-2">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pincode">pincode</label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            id="pincode"
                            value={postalCode}
                            onChange={e => {
                              setPostalCode(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="pin-state">Country</label>
                          <input
                            type="name"
                            className="form-control form-control-sm"
                            id="pin-state"
                            value={country}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pt-3 pb-2">
                      {/* <a href="" className="form-pink-bg-btn"> */}
                      <input
                        type="submit"
                        className="form-pink-bg-btn submitButton"
                        value="Submit"
                      />
                      {/* submit */}
                      {/* </a> */}
                    </div>
                  </form>
                </div>
                {/* <div className="col-lg-3"></div> */}
              </div>
            </div>
            {/* <div className="col-md-4 pl-4">
              <p className="clr-black fs-16">order summary</p>
              <div className="row no-gutters">
                <div className="col-md-3 text-center">
                  <div className="bg-white ">
                    <img
                      src={"/images/bag/bag1.png"}
                      className="order-summary-img"
                    />
                  </div>
                </div>
                <div className="col-md-9 font-gtm-light clr-black pl-3">
                  <div className="row no-gutters">
                    <div className="col-8">
                      <p className="mb-0 font-weight-bold">boombolt</p>
                      <p className="mb-0 one-line-ellipse line-height1">
                        medium 25 L backpack backpack backpack backpack
                      </p>
                      <div className="cus-min-max-dropdown pt-2">
                        <DropdownButton
                          id="order-summary-dropdown-button"
                          size="sm"
                          title="qty: 1"
                          className="text-lowercase"
                        >
                          <Dropdown.Item href="">qty: 1</Dropdown.Item>
                          <Dropdown.Item href="">qty: 2</Dropdown.Item>
                          <Dropdown.Item href="">qty: 3</Dropdown.Item>
                          <Dropdown.Item href="">qty: 4</Dropdown.Item>
                        </DropdownButton>
                      </div>
                      <p className="mb-0 pt-2">
                        <a href="" className="order-summary-remove-link">
                          <i
                            className="fa fa-trash pr-1"
                            aria-hidden="true"
                          ></i>
                          remove
                        </a>
                      </p>
                    </div>
                    <div className="col-4 text-right">
                      <p className="mb-0 font-weight-bold">&#8377; 999</p>
                      <p className="mb-0 line-height1">
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">20% off</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="clr-black fs-16 pt-4 mb-0 pb-3">
                price details (2 items)
              </p>
              <div className="row no-gutters pb-1">
                <div className="col-md-8">
                  <p className="mb-0 price-details-text">total MRP</p>
                </div>
                <div className="col-md-4 text-right">
                  <p className="mb-0 price-details-text">&#8377; 2600</p>
                </div>
              </div>
              <div className="row no-gutters pb-1">
                <div className="col-md-9">
                  <p className="mb-0 price-details-text">
                    Convenience fee
                    <a href="" className="know-more-link">
                      know more
                    </a>
                  </p>
                </div>
                <div className="col-md-3 text-right">
                  <p className="mb-0 price-details-text">&#8377; 100</p>
                </div>
              </div>
              <div className="row no-gutters pb-1">
                <div className="col-md-8">
                  <p className="mb-0 price-details-text">coupan discount</p>
                </div>
                <div className="col-md-4 text-right">
                  <p className="mb-0 price-details-text">&#8377; 700</p>
                </div>
              </div>
              <div className="row no-gutters pb-1">
                <div className="col-md-9">
                  <p className="mb-0 price-details-text">
                    total payable amount
                  </p>
                  <p className="mb-0 your-saving-rs-text">
                    (you are saving &#8377;<span>700</span> on this order)
                  </p>
                </div>
                <div className="col-md-3 text-right">
                  <p className="mb-0 price-details-text">&#8377; 1998</p>
                </div>
              </div>
              <div className="py-3">
                <a href="" className="place-order-btn d-block text-center">
                  continue
                </a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Address;
