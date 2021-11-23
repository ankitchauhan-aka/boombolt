import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import "../index.css";
import Header1 from "../components/Header1";
import HeaderWhite from "../components/HeaderWhite";
import { forgotPasswordAction, updateForgetPassword } from "../actions/userActions";

const ForgotPassword = ({ match, history }) => {
    const firstRender = useRef(false);
    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [disable, setDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage]=useState(null);
    const dispatch = useDispatch();

    const forgotPassword = useSelector((state) => state.forgotPassword);
    console.log(forgotPassword, "jhnjk");

    const user = useSelector((state) => state.updateForgetPassword);

    let userError = user?.error;
    console.log(userError, "userError...//")

    const submitHandler = e => {
        e.preventDefault();
        dispatch(forgotPasswordAction(email))
    };
    
    useEffect(() => {
        if (userError == "Otp not matched") {
            setErrorMessage("incorrect OTP");
        }
    })

    const savePassword = e => {
        e.preventDefault();
        console.log("savePassword../", userError)
        if (newPassword !== password) {
            setErrorMessage("New and Confirm Passwords do not match");
        }
        else {
            dispatch(updateForgetPassword(email, otp, password));
            setSuccessMessage("new password Updated");
            history.log("/login");
        }
    }
    return (
        <>
            <HeaderWhite />
            <div className="background-image px-md-5">
                <div className="container-fluid">
                    <div className="row py-4 no-gutters">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-2 text-center card border-right-0 bg-f7f7f7">
                            <h4 className="pt-5 login-heading">
                                <div className="mt-5 forgetPassword">Forgot<br></br>Password</div>
                            </h4>
                        </div>
                        <div className="col-lg-4 card">
                            <Form className="py-4 px-4">
                                <Form.Group controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        required
                                        onChange={e => setEmail(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <p className="text-right mb-0">
                                    <button onClick={submitHandler}>get otp</button>
                                </p>
                                <Form.Group controlId="email">
                                    <Form.Label>OTP</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        required
                                        onChange={e => setOTP(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter New Password"
                                        value={newPassword}
                                        required
                                        onChange={e => setNewPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Confirm Password"
                                        value={password}
                                        required
                                        onChange={e => setPassword(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="form-control mt-2"
                                    onClick={savePassword}
                                >
                                    Save
                                </Button>
                                <br />
                                <br />
                                {errorMessage ? (<Message variant="danger">{errorMessage}</Message>):
                                (successMessage && <Message variant="success">{successMessage}</Message>)}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
