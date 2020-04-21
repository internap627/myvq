import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./SignedOut.css";
import Login from "../auth/Login";
import Register from "../auth/Register";
import BusinessLogin from '../auth/BusinessLogin';

function SignedOut() {
  const [toggle, setToggle] = useState(true);
  const [businessToggle, setBusinessToggle] = useState(false);

  const toggleBusiness = () => {
    setBusinessToggle(!businessToggle);
  };

  const toggleUserForm = () => {
    setToggle(!toggle);
  };

  return toggle && !businessToggle ? (
    <Login toggleUserForm={toggleUserForm} toggleBusiness={toggleBusiness} />
  ) : !toggle && !businessToggle ? (
    <Register toggleUserForm={toggleUserForm} />
  ) :  (
    <BusinessLogin toggleBusiness={toggleBusiness} />
  ) 
}

export default withRouter(SignedOut);
