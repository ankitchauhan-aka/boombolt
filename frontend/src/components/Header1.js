import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { CSSTransition } from "react-transition-group";
import { getWishList, removeWish } from "../actions/productActions";

import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Dropdown,
  DropdownButton,
  NavDropdown
} from "react-bootstrap";
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuHeader,
  MenuDivider
} from "@szhsin/react-menu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { fetchTopNav, logout } from "../actions/userActions";
import SearchBox from "./SearchBox";

const Header1 = ({ history, match }) => {
  const [scroll, setScroll] = useState(false);
  const [searchtext, setSearchtext] = useState(false);
  const topNavItems = useSelector(state => state.layout.navItems);
  const dispatch = useDispatch();
  const wishList = useSelector(state => state.wishList);
  const { wishlistItems } = wishList;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  let activeLink = "";
  function setActiveLink(e) {
    activeLink = "inactive";
  }
  const location = useLocation();

  const { pathname } = location;
  const splitLocation = pathname.split("/");

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 1);
    });
  }, []);
  var userId;
  if (localStorage.userInfo) {
    userId = JSON.parse(localStorage.userInfo)?._id;
  }
  useEffect(() => {
    if (userId) {
      dispatch(getWishList(userId));
    }
    dispatch(fetchTopNav());
  }, [dispatch]);
  const logOut = () => {
    dispatch(logout());
  };
  const [showMessage, setShowMessage] = useState(false);
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
        expand="xl"
        variant="light"
        className={
          scroll ? "boombolt-nav-white py-1 fixed-top " : "boombolt-nav py-1"
        }
      >
        <Navbar.Brand href="/" className="nb-brand">
          <Image
            alt=""
            src={scroll ? "/images/fox-black-2.png" : "/images/fox.png"}
            className="d-inline-block align-top img-fluid img-responsive logo1"
            fluid
          />
          <img
            src={
              scroll
                ? "/images/boombolt-black-logo-text.png"
                : "/images/bb-wt.png"
            }
            className="d-inline-block align-middle img-logo-text img-fluid img-responsive logo2"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="navbar-nav w-100 header1-nav">
            <Nav className="pr-2 m-auto margin-custom-auto text-left hover-border-img topNav">
              <ul className="menu">
                {/* home  */}
                <li className="menu-li-1">
                  <a href="" className="menu-li1-a text-white active">
                    Home
                  </a>
                </li>
                {/* new arrival  */}
                {topNavItems &&
                  topNavItems.length > 0 &&
                  topNavItems.map(navItem => {
                    return (
                      <>
                        <li key={navItem.id} className="menu-li-1 topNavFullScreen">
                          <a
                            href={"/productcatalouge/" + navItem.slug}
                            className="menu-li1-a text-white"
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
                            <li className="submenu-header1">
                              {navItem.childCategories.map((navdata, i) => (
                                // <a href={'/category/${navdata.slug}'} className="sublink-img-no-sign pl-0">
                                <a
                                  href={"/productcatalouge/" + navdata.slug}
                                  className="sublink-img-no-sign pl-0"
                                  key={i}
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
                  <li className="menu-li-left  ">
                    <a href="#" className="menu-li1-a">
                      <img src={"/images/user.png"} />
                    </a>
                    <ul className="right-dd-open userAcountDetail">
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
            {/* ======================= nav for ipad and ipad pro -============================== */}
            <Nav className="pr-2 m-auto margin-custom-auto text-left hover-border-img d-none naviPadUi">
              <ul className="menu">
                {/* home  */}
                <li className="menu-li-1">
                  <a href="" className="menu-li1-a text-white active">
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

                            className="menu-li1-a text-white"
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
                                  className="sublink-img-no-sign pl-0"
                                  key={i}
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
                  topNavItems.map(navItem => {
                    return (
                      <>
                        <div className="dropdown">
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
                                className={`sublink-img-no-sign pl-0 ${splitLocation[2] === navdata.slug
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

                      <a
                        href="/dashboard"
                        className="sublink-img-no-sign pl-0"
                      >
                        <span className="left-line-dd"></span>
                        <span className="left-line-dd-txt pl-2">profile</span>
                      </a>

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
                      <a
                        href="/allOrders"
                        className="sublink-img-no-sign pl-0"
                      >
                        <span className="left-line-dd"></span>
                        <span className="left-line-dd-txt pl-2">
                          my order
                          </span>
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

            {/* <div className="d-inline text-left">
              {/* </ul> */}
            {/* </div> */}
          </div>

          <div
            className={`level-2 ${visibility ? "d-block" : "d-none"}`}
            onMouseOver={showDivhandler}
            onMouseLeave={hideDivhandler} >
            <div className="row py-5">
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
                  topNavItems.map((navItem, i) => {
                    return (
                      <ul key={i}>
                        {navItem.childCategories.map((navdata, i) => (
                          <li key={i}>{navdata.products.map((product, i) => {
                            return (
                              <p key={i}>
                                {product?.sale_include &&
                                  <a key={i} href={"/ProductDetail/" + product.slug}>{product.name}</a>
                                }                                
                              </p>
                            )
                          })}</li>
                        ))}

                      </ul>
                    )
                  })}
              </div>
              <div className="col-md-4 text-left">
                <div className="row">
                  <div className="col-md-8">
                    <div className="right-sale">
                      <h5>OFFERS</h5>
                      <p className="my-3 pb-2">
                        <a>
                          <img src={"/images/sale/next_day_delivery.svg"}></img>
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
                  <div className="col-md-4">
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
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default withRouter(Header1);
