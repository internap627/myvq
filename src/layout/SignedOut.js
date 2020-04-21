import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./SignedOut.css";
import Login from "../auth/Login";
import Register from "../auth/Register";

function SignedOut() {
  const [toggle, setToggle] = useState(true);

  const toggleForm = () => {
    setToggle(!toggle);
  };

  return toggle ? (
    <Login toggleForm={toggleForm} />
  ) : (
    <Register toggleForm={toggleForm} />
  );
}

export default withRouter(SignedOut);
