import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listHomeCategory } from "../actions/homecategoryActions";

const HomeCategory = ({ match, history }) => {
  const dispatch = useDispatch();
  const homecategories = useSelector(state => state.homecategory);
  useEffect(() => {
    dispatch(listHomeCategory());
  }, [dispatch]);

  return (
    homecategories &&
    homecategories?.data?.length > 0 && (
      <>
        {" "}
        <div className="background-image">
          {/* <div className="marquee">
            <div className="marquee__inner" aria-hidden="true">
              <span className="clr-marquee-white">
                cross&nbsp;boundaries&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/
              </span>
              <span className="clr-marquee-white">
                cross&nbsp;boundaries&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/
              </span>
              <span className="clr-marquee-white">
                cross&nbsp;boundaries&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/
              </span>
              <span className="clr-marquee-white">
                cross&nbsp;boundaries&nbsp;/&nbsp;/&nbsp;/&nbsp;/&nbsp;/
              </span>
            </div>
          </div> */}
          <div className="text-overlay"></div>
          <div className="container pb-4 pt-5">
            <div className="row">
              <div className="col-12 text-center cat-text-div">
                <h3 className="category-heading-txt pt-4">categories</h3>
                <p className="category-heading-subtxt">
                  only rad styles in here
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid cat-img-div px-0">
          <div className="row no-gutters">
            <div className="col-md-6 h-100 hover-effect hover-overlay-effect home-category">
              <a
                href={`/productcatalouge/${homecategories?.data[0]?.categories[0]?.slug}`}
              >
                <img
                  src={homecategories?.data[0]?.image}
                  className="h-100vh hover-effect-img"
                />
                <div className="img-overlay one-overlay"></div>
                <p className="img-overlay-text">
                  {homecategories?.data[0]?.categories[0]?.title}
                </p>
              </a>
            </div>
            <div className="col-md-6 h-100">
              <div className="row no-gutters">
                <div className="col-md-12 hover-effect hover-overlay-effect">
                  <a
                    href={`/productcatalouge/${homecategories?.data[1]?.categories[0]?.title}`}
                  >
                    <img
                      src={homecategories?.data[1]?.image}
                      className="h-50vh hover-effect-img"
                    />
                    <div className="img-overlay two-overlay"></div>
                    <p className="img-overlay-text">
                      {" "}
                      {homecategories?.data[1]?.categories[0]?.title}
                    </p>
                  </a>
                </div>
                <div className="col-md-12 hover-effect hover-overlay-effect">
                  <a
                    href={`/productcatalouge/${homecategories?.data[2]?.categories[0]?.title}`}
                  >
                    <img
                      src={homecategories?.data[2]?.image}
                      className="h-50vh hover-effect-img"
                    />
                    <div className="img-overlay one-overlay"></div>
                    <p className="img-overlay-text">
                      {" "}
                      {homecategories?.data[2]?.categories[0]?.title}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-md-3 hover-effect hover-overlay-effect home-cat2">
              <a
                href={`/productcatalouge/${homecategories?.data[3]?.categories[0]?.title}`}
              >
                <img
                  src={homecategories?.data[3]?.image}
                  className="h-50vh hover-effect-img"
                />
                <div className="img-overlay four-overlay"></div>
                <p className="img-overlay-text">
                  {" "}
                  {homecategories?.data[3]?.categories[0]?.title}
                </p>
              </a>
            </div>
            <div className="col-md-3 hover-effect hover-overlay-effect home-cat2">
              <a
                href={`/productcatalouge/${homecategories?.data[4]?.categories[0]?.title}`}
              >
                <img
                  src={homecategories?.data[4]?.image}
                  className="h-50vh hover-effect-img"
                />
                <div className="img-overlay three-overlay"></div>
                <p className="img-overlay-text">
                  {" "}
                  {homecategories?.data[4]?.categories[0]?.title}
                </p>
              </a>
            </div>
            <div className="col-md-3 hover-effect hover-overlay-effect home-cat2">
              <a
                href={`/productcatalouge/${homecategories?.data[5]?.categories[0]?.title}`}
              >
                <img
                  src={homecategories?.data[5]?.image}
                  className="h-50vh hover-effect-img"
                />
                <div className="img-overlay two-overlay"></div>
                <p className="img-overlay-text">
                  {" "}
                  {homecategories?.data[5]?.categories[0]?.title}
                </p>
              </a>
            </div>
            <div className="col-md-3 hover-effect hover-overlay-effect home-cat2">
              <a
                href={`/productcatalouge/${homecategories?.data[6]?.categories[0]?.title}`}
              >
                <img
                  src={homecategories?.data[6]?.image}
                  className="h-50vh hover-effect-img"
                />
                <div className="img-overlay one-overlay"></div>
                <p className="img-overlay-text">
                  {" "}
                  {homecategories?.data[6]?.categories[0]?.title}
                </p>
              </a>
            </div>
          </div>
        </div>
      </>
    )
  );
};
export default HomeCategory;
