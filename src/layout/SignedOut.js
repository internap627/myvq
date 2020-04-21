import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./SignedOut.css";
import Login from "../auth/Login";
import Register from "../auth/Register";
import BusinessLogin from "../auth/BusinessLogin";
import BusinessRegister from "../auth/BusinessRegister";

function SignedOut() {
  const [toggle, setToggle] = useState(true);
  const [businessReg, setBusinessReg] = useState(false);
  const [businessToggle, setBusinessToggle] = useState(false);

  const toggleBusinessReg = () => {
    setBusinessReg(!businessReg);
  };

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
  ) : businessToggle && !businessReg ? (
    <BusinessLogin
      toggleBusiness={toggleBusiness}
      toggleBusinessReg={toggleBusinessReg}
    /> 
  ) : <BusinessRegister toggleUserForm={toggleBusiness} />
}

export default withRouter(SignedOut);
