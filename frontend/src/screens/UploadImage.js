import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";

import fs from "fs"

import { useDispatch, useSelector } from "react-redux";
import Meta from "../components/Meta";
import "../index.css";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from '../constants/userConstants';
import HeaderWhite from "../components/HeaderWhite";



const UploadScreen = ({ match, history }) => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose file')
    const [state, setState] = useState('')
    const [uploadedFile, setUploadedFile] = useState({})
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;
    const userId = userInfo._id;

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/dashboard')
        } else {
            if (!userInfo.firstName || !userInfo.lastName || !userInfo.phone || !userInfo.email || userInfo._id !== userId) {
                dispatch(getUserDetails(userId))
            }
        }
    }, [dispatch, history, userInfo, successUpdate])

    const onChange = e => {
        setFilename(e.target.files[0].name)
        setFile(e.target.files[0])

        const file = e.target.files[0]
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log(reader.result);
            setFile(reader.result)
        };
        reader.readAsDataURL(file);
    }
    const submitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file)
        dispatch(updateUser({ _id: userId, file }))
        history.push(`/dashboard/`);
    }

    // useEffect(() => {
    //     if (userLogin.loading == false) {
    //     }
    //   }, userInfo);

    return (
        <>
            <HeaderWhite />
            <p className="breadcrumb mb-0">
                <Link to="/">Home</Link> &gt; upload image
            </p>
            <div className="background-image px-5">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-3"></div>

                        <div className="col-6">
                            <h2 className="py-4 text-center login-heading">Upload Image</h2>
                            <form onSubmit={submitHandler} className="card p-4 mb-5">
                                <div className="custom-file mb-4">
                                    <input type="file" onChange={onChange} className="custom-file-input" id="customFile" />
                                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                                </div>
                                <input type="submit" value="Upload" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
};

export default UploadScreen;