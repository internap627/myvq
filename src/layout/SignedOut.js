import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./SignedOut.css";
import Login from "../auth/Login";
import Register from "../auth/Register";

function SignedOut() {
  const [toggle, setToggle] = useState(true);

  const toggleUserForm = () => {
    setToggle(!toggle);
  };

  return toggle ? (
    <Login toggleUserForm={toggleUserForm} />
  ) : (
    <Register toggleUserForm={toggleUserForm} />
  );
}

export default withRouter(SignedOut);
