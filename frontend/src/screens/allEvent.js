import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import HeaderWhite from "../components/HeaderWhite";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { eventListCarousel } from "../actions/eventActions";

const AllEventScreen = ({ match, history }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const productTopRated = useSelector((state) => state.productTopRated);
    const { error, products } = productTopRated;
    const eventList = useSelector((state) => state.eventList);
    const events = eventList?.products?.payload;
    useEffect(() => {
        dispatch(eventListCarousel()).then(() => setLoading(false));
    }, [dispatch]);



    return (
        <>
            <HeaderWhite />
            <div className="background-image-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12 py-1 breadcrumb-div">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                                <Breadcrumb.Item>all event</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>

            {!events ? (
                <Message variant="danger">no event</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Starts From</th>
                            <th>Ends On</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            events?.map((value) => (
                                <tr>
                                    <td>{value.title}</td>
                                    <td>{value.location}</td>
                                    <td>{value.startfrom}</td>
                                    <td>{value.endson}</td>
                                    <td>{value.desc}</td>
                                    <td>{value?.image ? (
                                        <img src={`${value.image}`} height="100px" width="100px" />
                                    ) : (
                                        "No file"
                                    )}</td>
                                    <td><button className="btn-success">{value.active ? "Active" : "InActive"}</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
            )}
        </>
    );
};

export default AllEventScreen;
