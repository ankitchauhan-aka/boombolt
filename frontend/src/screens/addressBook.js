import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import HeaderWhite from "../components/HeaderWhite";
import { homeStatesList } from "../actions/stateActions";
import UserNav from "../screens/useNav";
import Message from "../components/Message";

import {
  saveBillingAddress,
  updateBillingAddress,
  saveShippingAddress,
  updateShippingAddress
} from "../actions/cartActions";
import {
  //   modifyAddress,
  //   setDefaultAddress,
  setDefaultBillingAddress,
  modifyBillingAddress
} from "../actions/userActions";
const Address = ({ match, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  //   address listing
  const addressDelete = useSelector(state => state.removeAddress);
  const addressUpdate = useSelector(state => state.updateAddress);
  const user = useSelector(state => state.userLogin.userInfo);
  const billingAddressDelete = useSelector(state => state.removeBillingAddress);
  const [addresses, setAddresses] = useState(userInfo?.addresses || []);
  const [billingaddresses, setBillingaddresses] = useState(
    userInfo?.billingaddresses || []
  );

  const editAddress = addressId => {
    history.push(`/address-book/${addressId}`);
  };
  const editBillingAddress = addressId => {
    history.push(`/address-book/${addressId}`);
  };

  const removeBillingAddress = (userId, addressId, type) => {
    const newBilAddress = [...billingaddresses];
    let index = newBilAddress.findIndex(addrs => addrs.id === addressId);
    newBilAddress.splice(index, 1);
    setBillingaddresses(newBilAddress);
    dispatch(modifyBillingAddress(userId, addressId, type));
  };
  const defaultBillingAddress = (userId, addressId, type) => {
    const newBilAddress = [...billingaddresses];
    var newAddress = [];
    newBilAddress.map(addres => {
      if (addres.id === addressId) {
        addres.defaultAddress = true;
        newAddress.push(addres);
      } else {
        addres.defaultAddress = false;
        newAddress.push(addres);
      }
    });
    setBillingaddresses(newAddress);
    dispatch(setDefaultBillingAddress(userId, addressId, type));
  };
  const removeShippingAddress = (userId, addressId, type) => {
    const newShipAddress = [...addresses];
    let index = newShipAddress.findIndex(addrs => addrs.id === addressId);
    newShipAddress.splice(index, 1);
    setAddresses(newShipAddress);
  };
  //   address listing

  const taxListZipcode = useSelector(state => state.homeStateList);
  const { homeStatesListing } = taxListZipcode;

  const [email, setEmail] = useState(userInfo?.email ? userInfo?.email : "");
  const [firstname, setFirstName] = useState(
    userInfo?.firstName ? userInfo?.firstName : ""
  );
  const [lastname, setLastName] = useState(
    userInfo?.lastName ? userInfo?.lastName : ""
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
  const [phone, setPhone] = useState(userInfo?.phone ? userInfo?.phone : "");
  const [userId, setUserId] = useState(userInfo?._id ? userInfo?._id : "");
  const [showAddAddress, setshowAddAddress] = useState(false);

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
      await dispatch(
        saveShippingAddress({
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
      await dispatch(
        updateShippingAddress(
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
    setshowAddAddress(false);
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
    setBillingaddresses(userInfo?.billingaddresses);
  }, [userInfo]);
  useEffect(() => {
    var id = match.params.addressId;
    // const billingaddresses = JSON.parse(localStorage.userInfo).billingaddresses;

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
  const addNewAddress = () => {
    setshowAddAddress(true);
  };

  const [filter, setFilter] = useState(true);
  function toggleFilter() {
    setFilter(!filter);
  }
  const BillingAddressBlock = address => {
    return (
      <div
        className="col-md-12 my-4 col-12 bg-c4c4c4 address-book-card biilingAddressDetail"
        key={address._id}
      >
        <div className="row">
          <div className="col-sm-9 userAddress">
            {" "}
            <p className="address-book-cart-text">
              {address.firstname} {address.lastname} <br></br>
              {address.streetaddress.join(", ")}
              <br />
              {address.state},{address.city},{address.postalCode}
              <br />
              {address.country},
              <br />
              Cell: {address.phone}
            </p>
          </div>
          <div className="col-sm-3">
            <div className="address-book-cart-link-div">
              <div className="row EditButton">
                <a
                  onClick={() => editBillingAddress(address._id)}
                  className="address-book-card-link1"
                >
                  <button className="button_width">Edit</button>
                </a>
              </div>
              <div className="row mt-3 RemoveButton">
                <a
                  onClick={() =>
                    removeBillingAddress(userInfo._id, address._id, "REMOVE")
                  }
                  className="address-book-card-link"
                >
                  <button className="button_width">Remove</button>
                </a>
              </div>
              <div className="row mt-3">
                {!address.defaultAddress && billingaddresses.length > 1 && (
                  <a
                    onClick={() =>
                      defaultBillingAddress(
                        userInfo._id,
                        address._id,
                        "SET_DEFAULT"
                      )
                    }
                    className="address-book-card-link"
                  >
                    <button className="button_width">Set as default</button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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
                <Breadcrumb.Item href="/address-book">
                  address book
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image px-md-3">
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
          <div className="row pb-4 pt-3">
            <div className="col-md-4">
              <div className="row my-4">
                <div className="col-md-12">
                  <h4 className="welcome-user-name mx-md-5 welcome_user_address">
                    select delivery address
                  </h4>
                </div>
              </div>
              <button
                className="d-block d-md-none filter-btn mb-3"
                type="button"
                onClick={toggleFilter}
              >
                My Address
                   </button>

              <div
                className={`col-md-12 col-lg-12 col-xl-9 ${filter ? "d-none" : "d-block"
                  } d-md-block`}
              >
                <div className="row">
                  <div className="col-md-12 col-lg-12 mx-md-5 sm-userNav">
                    <UserNav />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row pt-2 pb-5">
                <div className="col-md-12 col-xl-10 text-right pr-0 sm-btn-addnew">
                  <div className="position-relative pink-bg-btn2 mt-2 addNewAddressButton">
                    <a
                      onClick={addNewAddress}
                      style={{ cursor: "pointer" }}
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
              {!showAddAddress && (
                <div className="row pb-4">
                  <div className="col-md-10 col-lg-9 col-xl-6 biilingAddressDetail">
                    <div className="row brdr-form pt-3 pb-1 biilingAddress">
                      <div className="col-md-12 biilingAddressDetail">
                        {billingaddresses ? billingaddresses?.map(address =>
                          BillingAddressBlock(address)
                        ) : (
                          <Message variant="danger">User has not added his address</Message>
                        )
                        }
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {showAddAddress && (
                <div className="row pb-4">
                  <div className="col-md-8">
                    <div className="row brdr-form pt-3 pb-4">
                      <div className="col-md-12">
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
                                <label htmlFor="city">
                                  city / district / town
                                </label>
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
                                    className="state-drpdwn us-states state-dropDownButton dropDownButtonAddNewAdd "
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
                              className="form-pink-bg-btn"
                              value="Submit"
                            />
                            {/* submit */}
                            {/* </a> */}
                          </div>
                        </form>
                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Address;
