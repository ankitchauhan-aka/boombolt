import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import ScrollAnimation from "react-animate-on-scroll";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import InputRange from "react-input-range";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import HeaderWhite from "../components/HeaderWhite";
import { listProducts, getWishList } from "../actions/productActions";
import { getRounds } from "bcryptjs";
import Message from "../components/Message";
import Modal from "react-bootstrap/Modal";
import ProjectQuickLook from "../components/ProjectQuickLook";
import CloseButton from 'react-bootstrap/CloseButton'

import {
  getCategory,
  getBagsize,
  getMaterial,
  getColor
} from "../actions/userActions";
import { filter } from "underscore";
const ProductCatalouge = ({ match, history }) => {
  const listProduct = useSelector(state => state.productList);
  const { products } = listProduct;
  console.log(products, "all products")
  const pageNumber = match.params.pageNumber || 1;
  let keyword = match.params.keyword || "";
  const [value, setValue] = useState({ min: 1000, max: 5000 });
  const [minVal, setminVal] = useState(1000);
  const [maxVal, setmaxVal] = useState(5000);
  const [minDiscountVal, setDiscountMin] = useState(10);
  const [maxDiscountVal, setDiscountMax] = useState(100);
  const [page, setPage] = useState(pageNumber);
  const [pagerefresh, setPagerefresh] = useState(false);
  const topNavItems = useSelector(state => state.layout.navItems);
  const categories = useSelector(state => state.categorydata);
  const bagsize = useSelector(state => state.bagsizedata);
  const matdata = useSelector(state => state.materialdata);
  const colorData = useSelector(state => state.colordata);

  const brand = "";
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState([]);
  const [material, setMaterial] = useState([]);
  const [clearFilter, setClearFilter] = useState(false);
  const [discount, setDiscount] = useState({ min: 0, max: 100 });
  const [sort, setSort] = useState("recommended");
  const [color, setColor] = useState();
  const [producttype, setProductType] = useState();
  const [sortByPrice, setSortByPrice] = useState();
  const [show, setShow] = useState(false);
  const [quickLook, setQuickLook] = useState();
  let slug = match.params.slug;
  const dispatch = useDispatch();
  let sortedProduct;
  let sortedProduct1 = [];

  const clearAll = () => {
    setClearFilter(true);
    setSize([]);
    setMaterial([]);
    setPage(1);
    setValue({ min: 0, max: 50000 });
    keyword = "";
    slug = "";
    setDiscount({ min: 0, max: 100 });
    setSort("recommended");
    setColor();
    setPagerefresh(false);
    setCategory([]);
    setProductType();
    dispatch(listProducts());
  };
  var userId;
  if (localStorage.userInfo) {
    userId = JSON.parse(localStorage.userInfo)?._id;
  }

  // useEffect(() => {
  //   if (products?.products){
  //   let sortedProduct = products?.products.map((product)=>(
  //       product.discount_price
  //   ))
  //   sortedProduct.sort((a, b) => a - b).reverse();
  //     console.log(sortedProduct,"priceeeeeeeeeeeeee");
  //   }
  //   sortedProduct1.push(sortedProduct)
  // }, [products]);

  // console.log(sortedProduct1,"sortedProduct1sortedProduct1sortedProduct1")


  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBagsize());
    dispatch(getMaterial());
    dispatch(getColor());
    if (userId) {
      dispatch(getWishList(userId));
    }
    if (keyword) {
      dispatch(
        listProducts(
          slug,
          keyword,
          page,
          value,
          category,
          color,
          producttype,
          size,
          discount,
          material,
          sort
        )
      );
    } else if (slug) {
      dispatch(
        listProducts(
          slug,
          keyword,
          page,
          value,
          category,
          color,
          producttype,
          size,
          discount,
          material,
          sort
        )
      );
    } else {
      dispatch(listProducts());
    }
  }, [dispatch]);
  useEffect(() => {
    if (pagerefresh) {
      setPage(1);
      if (slug) {
        history.replace({
          pathname: `/productcatalouge/${slug}/page/1`
        });
      } else {
        history.replace({
          pathname: `/productcatalouge/page/1`
        });
      }
    }
  }, [category, discount, size, producttype, color, value]);
  const handlePagination = pagevalue => {
    if (pagevalue == "next") {
      setPage(page * 1 + 1);
      pagevalue = page * 1 + 1;
      if (slug) {
        history.replace({
          pathname: `/productcatalouge/${slug}/page/${pagevalue}`
        });
      } else if (keyword) {
        history.replace({
          pathname: `/search/${keyword}/page/${pagevalue}`
        });
      } else {
        history.replace({
          pathname: `/productcatalouge/page/${pagevalue}`
        });
      }

      dispatch(
        listProducts(
          slug,
          keyword,
          page + 1,
          value,
          category,
          color,
          producttype,
          size,
          discount,
          material,
          sort
        )
      );
    } else {
      if (pagevalue == "prev") {
        setPage(page - 1);
        pagevalue = page - 1;
      }
      if (slug) {
        history.replace({
          pathname: `/productcatalouge/${slug}/page/${pagevalue}`
        });
      } else if (keyword) {
        history.replace({
          pathname: `/search/${keyword}/page/${pagevalue}`
        });
      } else {
        history.replace({
          pathname: `/productcatalouge/page/${pagevalue}`
        });
      }
      setPage(pagevalue);
      dispatch(
        listProducts(
          slug,
          keyword,
          pagevalue,
          value,
          category,
          color,
          producttype,
          size,
          discount,
          material,
          sort
        )
      );
    }
  };
  const handleCategory = categ => {
    // setPagerefresh(true);
    var categoryData = [];
    // if (categ.target.checked) {
    if (category.length > 0) {
      category.map(data => {
        categoryData.push(data);
      });
      let index = category.indexOf(categ?.target?.value);
      if (index == -1) {
        categoryData.push(categ?.target?.value);
      } else {
        categoryData.splice(index, 1);
      }
    } else {
      categoryData.push(categ?.target?.value);
    }
    setCategory(categoryData);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        categoryData,
        color,
        producttype,
        size,
        discount,
        material,
        sort
      )
    );
  };

  const handleSize = categ => {
    setPagerefresh(true);
    var sizeData = [];
    if (size.length > 0) {
      size.map(data => {
        sizeData.push(data);
      });
      let index = size.indexOf(categ?.target?.value);
      if (index == -1) {
        sizeData.push(categ?.target?.value);
      } else {
        sizeData.splice(index, 1);
      }
    } else {
      sizeData.push(categ?.target?.value);
    }

    setSize(sizeData);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        producttype,
        sizeData,
        discount,
        material,
        sort
      )
    );
  };
  const handleMaterial = mat => {
    setPagerefresh(true);
    var materialData = [];
    if (material.length > 0) {
      material.map(data => {
        materialData.push(data);
      });
      let index = material.indexOf(mat?.target?.value);
      if (index == -1) {
        materialData.push(mat?.target?.value);
      } else {
        materialData.splice(index, 1);
      }
    } else {
      materialData.push(mat?.target?.value);
    }

    setMaterial(materialData);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        producttype,
        size,
        discount,
        materialData,
        sort
      )
    );
  };
  const handleSelectMin = e => {
    setPagerefresh(true);
    let minValue = Number(e);
    setminVal(minValue);
    setValue({ min: minValue, max: maxVal });
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        minValue,
        category,
        color,
        producttype,
        size,
        discount,
        material,
        sort
      )
    );
  };
  const handleSelectMax = e => {
    setPagerefresh(true);

    let maxValue = Number(e);
    setmaxVal(maxValue);
    setValue({ min: minVal, max: maxValue });

    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        maxValue,
        category,
        color,
        producttype,
        size,
        discount,
        material,
        sort
      )
    );
  };
  const setPriceFilter = val => {
    setPagerefresh(true);
    setValue(val);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        val,
        category,
        color,
        producttype,
        size,
        discount,
        material,
        sort
      )
    );
  };
  const setSubCategoryProduct = val => {
    setPagerefresh(true);
    setProductType(val);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        val,
        size,
        discount,
        material,
        sort
      )
    );
  };

  const handleDiscountMin = e => {
    setPagerefresh(true);
    let minDiscountval = Number(e);
    setDiscountMin(minDiscountval);
    setDiscount({ min: minDiscountval, max: maxDiscountVal });
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        producttype,
        size,
        minDiscountval,
        material,
        sort
      )
    );
  };
  const handleDiscountMax = e => {
    setPagerefresh(true);
    let maxDiscountval = Number(e);
    setDiscountMax(maxDiscountval);
    setDiscount({ min: minDiscountVal, max: maxDiscountval });

    // setValue({ min: minValue, max: maxVal })
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        producttype,
        size,
        maxDiscountval,
        material,
        sort
      )
    );
  };

  const setDiscountRange = e => {
    setPagerefresh(true);
    setDiscount(e);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        producttype,
        size,
        e,
        material,
        sort
      )
    );
  };
  const sortHandler = e => {
    console.log("sortHandler.....")
    setPagerefresh(true);
    setSort(e.target.value);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        color,
        producttype,
        size,
        discount,
        material,
        e.target.value
      )
    );
  };
  console.log(sort, "sort.....")

  const setColorFilter = e => {
    setPagerefresh(true);
    setColor(e);
    dispatch(
      listProducts(
        slug,
        keyword,
        page,
        value,
        category,
        e,
        producttype,
        size,
        discount,
        material,
        sort
      )
    );
  };
  const [filter, setFilter] = useState(true);
  function toggleFilter() {
    setFilter(!filter);
  }
  // const [value,setValue]=useState(1000);

  const productQuickLook = (product) => {
    console.log(product, "product iddddd")
    setShow(true);
    setQuickLook(product)
  }

  return (
    <>
      <HeaderWhite />
      <div className="background-image-dark">
        <div className="container-fluid px-md-5 px-3">
          <div className="row">
            <div className="col-12 py-1 breadcrumb-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                <Breadcrumb.Item href="/productcatalouge/">
                  all product
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/productcatalouge/:slug">
                  {slug}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image">
        <div className="container-fluid px-md-0">
          <div className="row pt-3 no-gutters">
            {/* left side div */}
            <button
              className="d-block d-md-none w-100 filter-btn"
              type="button"
              onClick={toggleFilter}
            >
              Filter
            </button>

            <div
              className={`col-md-3 col-lg-3 col-xl-2 ${filter ? "d-none" : "d-block"
                } d-md-block`}
            >
              <div className="pl-md-3 pl-lg-5 pb-3px pt-2">
                <p className="category-heading-subtxt">filter</p>
                <ScrollAnimation
                  style={{ opacity: 1 }}
                  className="filter-brdr-img"
                  animateIn="fadeIn"
                  className="filter-brdr-img"
                  animateIn="fadeIn"
                  duration={0}
                  animateOnce={true}
                  className="filter-brdr-img"
                  animateIn="fadeIn"
                  duration={0}
                  animateOnce={true}
                  duration={0}
                  animateOnce={true}
                >
                  <img src={"/images/border-black.png"} />
                </ScrollAnimation>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-lg-5 py-2 clearAll">
                <a
                  onClick={clearAll}
                  className="px-0 all-event1 brder-lr-blue py-0 edgtf-btn edgtf-btn-gapped_outline d-inline-block w-100 add-to-bag-link"
                >
                  <div className="row no-gutters">
                    <div className="col-12 text-center">
                      <span className="edgtf-btn-text text-black fs-16">
                        clear all
                      </span>
                    </div>
                  </div>
                  <span
                    className="edgtf-gapped-border edgtf-gapped-border-top"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(42 58 96) 0%, rgb(42 58 96) 85%, transparent 85%, transparent 89%, rgb(42 58 96) 89%, rgb(42 58 96) 100%)"
                    }}
                  ></span>
                  <span
                    className="edgtf-gapped-border edgtf-gapped-border-bottom"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(42 58 96) 0%, rgb(42 58 96) 15%, transparent 15%, transparent 19%, rgb(42 58 96) 19%, rgb(42 58 96) 100%)"
                    }}
                  ></span>
                </a>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3">
                <div className="cntr">
                  <div>
                    <label htmlFor="opt1" className="mb-0 nav-radio">
                      <input
                        style={{ cursor: "pointer" }}
                        type="radio"
                        name="rdo"
                        id="opt1"
                        className={`${clearFilter && !producttype
                          ? "nav-radio-btn-check"
                          : "nav-radio-btn"
                          }`}
                        onClick={e => setSubCategoryProduct("Men")}
                      />
                      <span className="label">men</span>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="opt2" className="mb-0 nav-radio">
                      <input
                        type="radio"
                        name="rdo"
                        id="opt2"
                        style={{ cursor: "pointer" }}
                        className={`${clearFilter && !producttype
                          ? "nav-radio-btn-check"
                          : "nav-radio-btn"
                          }`}
                        onClick={e => setSubCategoryProduct("Women")}
                      />
                      <span className="label">women</span>
                    </label>
                  </div>
                  <div>
                    <label htmlFor="opt3" className="mb-0 nav-radio">
                      <input
                        type="radio"
                        style={{ cursor: "pointer" }}
                        name="rdo"
                        id="opt3"
                        className={`${clearFilter && !producttype
                          ? "nav-radio-btn-check"
                          : "nav-radio-btn"
                          }`}
                        onClick={e => setSubCategoryProduct("Junior")}
                      />
                      <span className="label">junior</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3 categoryFilter">
                <p className="mb-2 category-heding-txt categoriesSection">
                  categories
                </p>
                <div className="brandScroll">
                  {categories?.data &&
                    categories?.data.length > 0 &&
                    [
                      ...categories?.data.filter(filterCateg =>
                        filterCateg.title.toLowerCase()
                      )
                    ].map((item, key) => (
                      <div className="row" key={item.id}>
                        <div className="col-12">
                          {item.count != 0 && (
                            <label className="chkbox-lbl">
                              {item.count != 0 && (
                                <label className="checkbox" htmlFor={item.id}>
                                  &nbsp;{item.title}
                                </label>
                              )}
                              <input
                                type="checkbox"
                                id={item.id}
                                name={item.id}
                                value={item.title}
                                onChange={e => handleCategory(e)}
                                checked={
                                  category.length
                                    ? category.includes(item.title)
                                    : false
                                }
                              />
                              <span className="checkmark"></span>
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3 inputRangeDiv">
                <p className="mb-2 category-heding-txt">price</p>
                <div className="min-max-range-div pl-0 pr-3 inputRange">
                  <InputRange
                    maxValue={10000}
                    minValue={0}
                    value={value}
                    onChange={value => setPriceFilter(value)}
                  />
                </div>
                <div className="mt-3 cus-min-max-dropdown">
                  <DropdownButton
                    id="dropdown-basic-button"
                    size="sm"
                    title={value.min}
                    className="mr-2"
                    onSelect={e => handleSelectMin(e)}
                  >
                    {/* <Dropdown.Item href="">{value.min}</Dropdown.Item> */}
                    {/* <Dropdown.Item eventKey="100" >100</Dropdown.Item> */}
                    <Dropdown.Item eventKey="1000">1000</Dropdown.Item>
                    <Dropdown.Item eventKey="2000">2000</Dropdown.Item>
                    <Dropdown.Item eventKey="3000">3000</Dropdown.Item>
                    <Dropdown.Item eventKey="4000">4000</Dropdown.Item>
                  </DropdownButton>

                  <span className="span-to">to</span>
                  <DropdownButton
                    id="dropdown-basic-button2"
                    size="sm"
                    title={value.max}
                    className="ml-2"
                    onSelect={e => handleSelectMax(e)}
                  >
                    <Dropdown.Item eventKey="5000">5000</Dropdown.Item>
                    <Dropdown.Item eventKey="6000">6000</Dropdown.Item>
                    <Dropdown.Item eventKey="7000">7000</Dropdown.Item>
                    <Dropdown.Item eventKey="8000">8000</Dropdown.Item>
                    <Dropdown.Item eventKey="9000">9000</Dropdown.Item>
                    <Dropdown.Item eventKey="10000">10000</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3">
                <p className="mb-2 category-heding-txt">color</p>
                <div>
                  {colorData?.data?.map(val => (
                    <button
                      key={val?.id}
                      className={`clr-select ${color == val?.title ? "active-border" : ""
                        }`}
                      style={{ backgroundColor: val?.colorcode }}
                      onClick={e => setColorFilter(val?.title)}
                    ></button>
                  ))}
                  {/* <button
                    className="clr-select bg-blue"
                    onClick={e => setColorFilter("Blue")}
                  ></button>
                  <button
                    className="clr-select bg-green"
                    onClick={(e) => setColorFilter("Green")}
                  ></button> */}
                  {/* <button
                    className="clr-select bg-orange"
                    onClick={(e) => setColorOrange(e)}
                  ></button>
                </div>
                <div className="line-height1">
                  <button
                    className="clr-select bg-red"
                    onClick={(e) => setColorRed(e)}
                  ></button>
                  <button
                    className="clr-select bg-yellow"
                    onClick={(e) => setColorYellow(e)}
                  ></button> */}
                </div>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3">
                <p className="mb-2 category-heding-txt">material</p>
                <div>
                  {/* <label className="chkbox-lbl">
                    polyster
                    <input
                      type="checkbox"
                      value="polyster"
                      onChange={e => handleMaterial(e)}
                    />
                    <span className="checkmark"></span>
                  </label> */}
                  {matdata &&
                    matdata?.data?.map(data => (
                      <label key={data.id} className="chkbox-lbl">
                        {data.title}
                        <input
                          type="checkbox"
                          value={data.title}
                          onChange={e => handleMaterial(e)}
                          checked={
                            material.length
                              ? material.includes(data.title)
                              : false
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    ))}
                </div>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3">
                <p className="mb-2 category-heding-txt">bag size</p>
                <div>
                  {bagsize &&
                    bagsize?.data?.map(sizes => (
                      <label key={sizes.id} className="chkbox-lbl">
                        {sizes.title}{" "}
                        {sizes?.minsize &&
                          "(" + sizes?.minsize + " - " + sizes?.maxsize + ")"}
                        <input
                          type="checkbox"
                          value={sizes.title}
                          onChange={e => handleSize(e)}
                          checked={
                            size.length ? size.includes(sizes.title) : false
                          }
                        />
                        <span className="checkmark"></span>
                      </label>
                    ))}
                </div>
              </div>
              <div className="brdr-t-white"></div>
              <div className="pl-md-3 pl-lg-5 py-3 inputRangeDiv">
                <p className="mb-2 category-heding-txt">discount range</p>
                <div className="min-max-range-div pl-0 pr-3 inputRange">
                  <InputRange
                    maxValue={100}
                    minValue={0}
                    value={discount}
                    onChange={discount => setDiscountRange(discount)}
                  />
                </div>
                <div className="mt-3 cus-min-max-dropdown">
                  <DropdownButton
                    id="dropdown-basic-button"
                    size="sm"
                    title={discount.min}
                    className="mr-2"
                    onSelect={e => handleDiscountMin(e)}
                  >
                    {/* <Dropdown.Item href="">{discount.min}</Dropdown.Item> */}
                    <Dropdown.Item eventKey="10">10</Dropdown.Item>
                    <Dropdown.Item eventKey="25">25</Dropdown.Item>
                    <Dropdown.Item eventKey="40">40</Dropdown.Item>
                  </DropdownButton>

                  <span className="span-to">to</span>
                  <DropdownButton
                    id="dropdown-basic-button2"
                    size="sm"
                    title={discount.max}
                    className="ml-2"
                    onSelect={e => handleDiscountMax(e)}
                  >
                    {/* <Dropdown.Item href="">{discount.max}</Dropdown.Item> */}
                    <Dropdown.Item eventKey="50">50</Dropdown.Item>
                    <Dropdown.Item eventKey="75">75</Dropdown.Item>
                    <Dropdown.Item eventKey="100">100</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </div>
            {/* right side div */}
            <div className="col-md-9 col-lg-9 col-xl-10 pr-md-3 pr-lg-5 custom-mt-4">
              <div className="row">
                <div className="col-md-9 text-center">
                  <p className="category-heading-subtxt mb-4 mb-md-0">{slug}</p>
                </div>
                <div className="col-md-3 sortBy pr-0">
                  <Form.Group controlId="exampleForm.SelectCustomSizeSm formGroup">
                    <Form.Control
                      as="select"
                      size="sm"
                      onChange={e => sortHandler(e)}
                      custom
                      value={sort}
                    >
                      <option
                        value="recommended"
                      // selected={sort ? sort == "recommended" : false}
                      >
                        sort-by: recommended
                      </option>
                      <option
                        value="popular"
                      // selected={sort ? sort == "popular" : false}
                      >
                        sort-by: popular
                      </option>
                      <option
                        value="high_to_low"
                      >
                        sort-by price: high to low
                      </option>
                      <option
                        value="low_to_high"
                      >
                        sort-by price: low to high
                      </option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
              <div className="brdr-l-white brdr-t-white">
                <div className="row no-gutters">
                  {products?.products && products?.products.length > 0 ? (
                    products.products.map(product => {
                      return (
                        <div
                          key={product.id}
                          className="col-md-3 col-lg-3 bg-white brdr-l-e1"
                        >
                          <div className="bagpack  border-top  p-3">
                            <span className="new-drop">NEW Drop</span>
                            <div className="bagpack-img text-center pt-4 imageP product_quick_look">
                              <a href={"/productdetail/" + product.slug}>
                                <img
                                  src={product.images[0]}
                                  className="productCatalougeImage"
                                />
                              </a>
                              <button className="quick_look_button"
                                // onClick={() => setShow(true)} 
                                onClick={() =>
                                  productQuickLook(
                                    product,
                                  )
                                }
                              >
                                QUICK LOOK</button>
                            </div>
                            <div className="bagpack-info">
                              <p className="bagpack-name">{product.name}</p>
                              <span className="span-rs">
                                &#8377; {product.discount_price}{" "}
                              </span>
                              <span className="strike-rs">
                                <s>&#8377;{product.price}</s>{" "}
                              </span>

                              {/* <span className="span-rs">{product.colors}</span> */}
                              <span className="off-percent">
                                (
                                {Math.round(
                                  ((product.price - product.discount_price) *
                                    100) /
                                  product.price
                                )}
                                % off)
                              </span>

                              <p className="off-percent">
                                {product.size?.map((size, index) => {
                                  return (
                                    <button
                                      className="bg-white mx-1 mt-1"
                                      key={index}
                                    >
                                      {" "}
                                      {size?.title}{" "}
                                    </button>
                                  );
                                })}
                              </p>
                              <p className="off-percent">
                                {product.colors?.map((color, index) => {
                                  return (
                                    <button
                                      key={index}
                                      className="bg-white mx-1"
                                    >
                                      {" "}
                                      {color?.title}
                                    </button>
                                  );
                                })}
                              </p>
                              <p className="bagpack-star mb-2">
                                <span className="bagpack-star-span">
                                  <i className="fa fa-star"></i>
                                  <span>{product.rating.toFixed(1)}</span>
                                </span>
                              </p>
                              {/* <div className="pt-1">
                                {product?.size?.map((sizeitem) => {
                                  return (
                                    <span
                                      className={` clr-select23 ${size == sizeitem.title ? "btn active-border" : ""
                                        }`}
                                    >
                                      {sizeitem.title}
                                    </span>
                                  );
                                })}
                              </div> */}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Col md={12}>
                      <Message variant="danger">No Product found</Message>
                    </Col>
                  )}
                  {/* <div className="col-md-3 bg-e1">
                    <div className="bagpack">
                      <span className="new-drop">NEW Drop</span>
                      <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag2.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-white">
                    <div className="bagpack">
                      <span className="top-rated new-drop">top-rated</span>
                      <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag3.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-e1">
                    <div className="bagpack"> */}
                  {/* <span className="new-drop">NEW Drop</span> */}
                  {/* <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag4.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-e1">
                    <div className="bagpack"> */}
                  {/* <span className="new-drop">NEW Drop</span> */}
                  {/* <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag5.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-white">
                    <div className="bagpack"> */}
                  {/* <span className="top-rated new-drop">top-rated</span> */}
                  {/* <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag6.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-e1">
                    <div className="bagpack"> */}
                  {/* <span className="new-drop">NEW Drop</span> */}
                  {/* <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag2.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-white">
                    <div className="bagpack"> */}
                  {/* <span className="top-rated new-drop">top-rated</span> */}
                  {/* <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag1.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-white brdr-l-e1">
                    <div className="bagpack">
                      <span className="new-drop">New Drop</span>
                      <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag1.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-e1">
                    <div className="bagpack">
                      <span className="new-drop">NEW Drop</span>
                      <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag2.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 bg-white">
                    <div className="bagpack">
                      <span className="top-rated new-drop">top-rated</span>
                      <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag3.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-md-3 bg-e1">
                    <div className="bagpack"> */}
                  {/* <span className="new-drop">NEW Drop</span> */}
                  {/* <div className="bagpack-img text-center pt-4">
                        <img src={"./images/bag/bag4.png"} />
                      </div>
                      <div className="bagpack-info px-3">
                        <p className="bagpack-name">boombolt backpack</p>
                        <span className="span-rs">&#8377; 799 </span>
                        <span className="strike-rs">
                          <s>&#8377;1499</s>{" "}
                        </span>
                        <span className="off-percent">(46% off)</span>
                        <p className="bagpack-star mb-2">
                          <span className="bagpack-star-span">
                            <i className="fa fa-star"></i>
                            <span>4.5</span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="row mb-3">
                {products?.pages > 1 && (
                  <>
                    <div className="col-md-12 text-center mt-4">
                      <div className="pagination-mb-2">
                        <span className="page-of">
                          Page {page} of {products?.pages}
                        </span>
                      </div>
                      <Pagination className="justify-content-center mb-0 cus-pagination">
                        {page != 1 && (
                          <Pagination.Item aria-label="prev">
                            <span
                              aria-hidden="true"
                              onClick={() => handlePagination("prev")}
                            >
                              prev
                            </span>
                          </Pagination.Item>
                        )}
                        {page != 1 && page != 2 && page != 3 && (
                          <Pagination.Item aria-label="prev">
                            <span
                              aria-hidden="true"
                              onClick={() => handlePagination(1)}
                            >
                              1 ...
                            </span>
                          </Pagination.Item>
                        )}
                        {page - 1 != 0 && page - 2 != 0 && (
                          <Pagination.Item
                            onClick={() => handlePagination(page - 2)}
                          >
                            {page - 2}
                          </Pagination.Item>
                        )}
                        {page - 1 != 0 && (
                          <Pagination.Item
                            onClick={() => handlePagination(page - 1)}
                          >
                            {page - 1}
                          </Pagination.Item>
                        )}
                        {page != products?.pages && (
                          <Pagination.Item
                            active
                            onClick={() => handlePagination(page)}
                          >
                            {page}
                          </Pagination.Item>
                        )}
                        {page != products?.pages &&
                          page * 1 + 1 != products?.pages && (
                            <Pagination.Item
                              onClick={() => handlePagination(page * 1 + 1)}
                            >
                              {page * 1 + 1}
                            </Pagination.Item>
                          )}
                        {page * 1 != products?.pages &&
                          page * 1 + 1 != products?.pages &&
                          page * 1 + 2 != products?.pages && (
                            <Pagination.Item
                              onClick={() => handlePagination(page * 1 + 2)}
                            >
                              {page * 1 + 2}
                            </Pagination.Item>
                          )}
                        {page * 1 != products?.pages &&
                          page * 1 + 1 != products?.pages &&
                          page * 1 + 2 != products?.pages &&
                          page * 1 + 3 != products?.pages && (
                            <Pagination.Item
                              onClick={() => handlePagination(page * 1 + 3)}
                            >
                              {page * 1 + 3}
                            </Pagination.Item>
                          )}
                        {page != products?.pages && (
                          <Pagination.Item aria-label="last">
                            <span
                              aria-hidden="true"
                              onClick={() => handlePagination(products?.pages)}
                            >
                              last({products?.pages})
                            </span>
                          </Pagination.Item>
                        )}
                        {page == products?.pages && (
                          <Pagination.Item aria-label="last">
                            <span
                              aria-hidden="true"
                              active
                              onClick={() => handlePagination(products?.pages)}
                            >
                              last({products?.pages})
                            </span>
                          </Pagination.Item>
                        )}
                        {page != products?.pages &&
                          page != products?.pages * 1 - 1 && (
                            <Pagination.Item aria-label="next">
                              <span
                                aria-hidden="true"
                                onClick={() => handlePagination("next")}
                              >
                                next
                              </span>
                            </Pagination.Item>
                          )}
                      </Pagination>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-5 mt-5">
        <div className="container"></div>
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
          centered
          size="xl"
        >
          <Modal.Body>
            <div className="text-right">
              <span onClick={() => setShow(false)}>
                {/* <i className="fa fa-close" area-hidden="true"></i>*/}
                <CloseButton />
              </span>
            </div>

            <ProjectQuickLook
              handleClose={() => setShow(false)}
              singleProduct={quickLook}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default ProductCatalouge;
