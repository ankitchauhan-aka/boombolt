import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const UserNav = ({match, history}) => {
    const route = useLocation().pathname
    
    return (
        <div className="col-md-12 address-book pb-3 pb-md-0">
            <div className={route.includes("/address-book") ? "active change-password-wishlist" : "change-password-wishlist"}>
                <Link to="/address-book">My Address</Link>
                <hr />
            </div>
            <div className={route === "/allOrders" ? "active change-password-wishlist" : "change-password-wishlist"}>
                <Link to="/allOrders">My Orders</Link>
                <hr />
            </div>
            <div className={route === "/wishlist"?"active change-password-wishlist" : "change-password-wishlist"}>
                <Link to="/wishlist">My Wishlist</Link>
                <hr />
                </div>
                {/* <div className={route === "/addpayment" ? "active change-password-wishlist" : "change-password-wishlist"}>
                <Link to="/addpayment">Payment Options</Link>
                <hr />
            </div> */}
            {/* <div className={route === "/writereview" ? "active change-password-wishlist" : "change-password-wishlist"}>
                <Link to="/writereview/">My Product Reviews</Link>
                <hr />
            </div> */}
            <div className={route === "/communication_preference" ? "active change-password-wishlist" : "change-password-wishlist"}>
                <Link to="/communication_preference">Comm Preference</Link>
                <hr />
            </div>
            <div className={route === "/changePassword" ? "active change-password-wishlist mb-4" : "change-password-wishlist mb-4"}>
                <Link to="/changePassword">Change Password</Link>
            </div>
        </div>
    );
}
export default UserNav;