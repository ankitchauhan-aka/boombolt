import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-grid-carousel";
import { getNewDrop } from "../actions/userActions";

const NewArrivals = ({ match, history }) => {
  const newdrop = useSelector(state => state.newdrop);
  const { data } = newdrop;
  const newdropData = data;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewDrop());
  }, [dispatch]);

  return (
    <>
      <div className="background-image">
        <div className="container py-4">
          <div className="row">
            <div className="col-12 text-center">
              <h3 className="category-heading-txt">new drops</h3>
              <p className="category-heading-subtxt">
                own the streets with the latest drops
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid cat-img-div px-0 pb-3">
          <div className="row no-gutters pb-3">
            <div className="col-md-12 newarrivals">
              <Carousel cols={3} rows={1} gap={0} loop={true} showDots={true}>
                {newdropData?.length > 0 &&
                  newdropData.map(data => {
                    return (
                      <Carousel.Item key={data.id}>
                        <div className="new-arival-ul hover-effect">
                          <a
                            href={`/productcatalouge/${data.categories[0].slug}`}
                          >
                            <img
                              width="100%"
                              className="hover-effect-img custom-img-size"
                              // height="430"
                              // width="300"
                              // src={"./images/newarrival/appreal.png"}
                              src={data.backimage}
                            />
                          </a>
                          <div className="new-arrivals-div">
                            <a
                              href={`/productcatalouge/${data.categories[0].slug}`}
                            >
                              <img
                                src={data.logo}
                                height="70"
                                width="100"
                                // src={"./images/new-arrival.png"}
                              />
                              <p>{data.title}</p>
                            </a>
                          </div>
                        </div>
                      </Carousel.Item>
                    );
                  })}
                
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default NewArrivals;
