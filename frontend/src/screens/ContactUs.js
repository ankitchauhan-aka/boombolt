import React, { Component } from 'react'
import Carousel from 'react-grid-carousel'
import HeaderWhite from "../components/HeaderWhite";

const ContactUs = ({ match, history }) => {
    return (
        <>
            <HeaderWhite />
            <div className="background-image-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center py-3">
                            <p className="text-white mb-0">contact us</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background-image px-5">
                <div className="container-fluid">
                    <div className="row pt-4">
                        <div className="col-md-12 pl-0">
                            <h3 className="clr-sku mb-0 font-weight-normal">contact detail</h3>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-md-8">
                            <div className="row brdr-form pt-3 pb-4">
                                <div className="col-md-8">
                                    <form action="">
                                        <div className="row cus-textbox">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="fname">first name:</label>
                                                    <input type="name" className="form-control form-control-sm" id="fname" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="lname">last name:</label>
                                                    <input type="name" className="form-control form-control-sm" id="lname" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row cus-textbox">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">email:</label>
                                                    <input type="email" className="form-control form-control-sm" id="email" />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone no:</label>
                                                    <input type="number" className="form-control form-control-sm" id="phone" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row cus-textbox">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label htmlFor="msg">message:</label>
                                                    <textarea className="form-control form-control-sm" rows="5" id="comment"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                        <div className="position-relative pink-bg-btn2 mt-3">
                                            <a href="" className="all-event1 brder-lr-pink edgtf-btn edgtf-btn-gapped_outline">
                                                <span className="edgtf-btn-text text-pink">Submit</span>
                                                <span className="edgtf-gapped-border edgtf-gapped-border-top" style={{ background: "linear-gradient(to right, rgb(234 71 105) 0%, rgb(234 71 105) 85%, transparent 85%, transparent 89%, rgb(234 71 105) 89%, rgb(234 71 105) 100%)" }}></span>
                                                <span className="edgtf-gapped-border edgtf-gapped-border-bottom" style={{ background: "linear-gradient(to right, rgb(234 71 105) 0%, rgb(234 71 105) 15%, transparent 15%, transparent 19%, rgb(234 71 105) 19%, rgb(234 71 105) 100%)" }}></span>
                                            </a>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-4"></div>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ContactUs;