import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import "../index.css";
import Carousel from 'react-bootstrap/Carousel';
import NewArrivals from './NewArrivals';
import HotDeals from './HotDeals';
import EventActivities from './EventActivities';
import Address from './Address';
import HomeCategory from './HomeCategory';
import Header1 from "../components/Header1";
import HeaderWhite from "../components/HeaderWhite";
import Message from "../components/Message";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants';


const EditDetail = ({ match, history }) => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const userId = userInfo._id;

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: Error,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/dashboard')
        } else {
            if (!userInfo.firstName || !userInfo.lastName || !userInfo.phone || !userInfo.email || userInfo._id !== userId) {
                dispatch(getUserDetails(userId))

            } else {
                setFirstName(userInfo.firstName)
                setLastName(userInfo.lastName)
                setEmail(userInfo.email)
                setPhone(userInfo.phone)
                dispatch(getUserDetails(userId))
            }
        }
    }, [dispatch, history, userInfo, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, firstName, lastName, email,phone }))
        if (Error) {
            setErrorMessage("User detail not updated");
        }
        else {
            setSuccessMessage("Updated")
            // history.push(`/dashboard`);
            // window.location("/dashboard")
        }
    }

    return (
        <>
            <HeaderWhite />
            <div className="background-image-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-12 py-1 breadcrumb-div">
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">home</Breadcrumb.Item>
                                <Breadcrumb.Item>update detail</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className="background-image">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 col-lg-2 col-xl-3"></div>
                        <div className="col-12 col-md-8 col-lg-8 col-xl-6">
                            <h1 className="py-4 text-center login-heading">Update Details</h1>
                            <Form onSubmit={submitHandler} className="card p-4 mb-5">
                                <Form.Group controlId='firstname'>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter First Name'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='lastname'>
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Your LastName'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email Id</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Your Email Id'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='phone'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Your Phone number'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='primary ' className="mt-3">
                                    Update
                                </Button>
                                <br />
                                {errorMessage && <Message variant="danger">{errorMessage}</Message>}
                                {successMessage && <Message variant="success">{successMessage}</Message>}



                            </Form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EditDetail;