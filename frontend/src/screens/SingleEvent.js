import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HeaderWhite from "../components/HeaderWhite";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { singleEventDetail } from "../actions/eventActions";

const SingleEventScreen = ({ match, history }) => {
    const eventId = match.params.id;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const productTopRated = useSelector((state) => state.productTopRated);
    const { error, products } = productTopRated;
    const eventList = useSelector((state) => state.singleEvent);
    const events = eventList.product;
    useEffect(() => {
        dispatch(singleEventDetail(eventId)).then(() => setLoading(false));
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
                                <Breadcrumb.Item>event detail</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
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
                            <tr>
                                <td>{events.title}</td>
                                <td>{events.location}</td>
                                <td>{events.startfrom}</td>
                                <td>{events.endson}</td>
                                <td>{events.desc}</td>
                                <td>{events?.image ? (
                                    <img src={`${events.image}`} height="100px" width="100px" />
                                ) : (
                                    "No file"
                                )}</td>
                                <td><button className="btn-success">{events.active ? "Active" : "InActive"}</button></td>
                            </tr>
                        }

                    </tbody>
                </Table>
            )}
        </>
    );
};

export default SingleEventScreen;
