import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./SignedOut.css";
import Login from "./Login";
import Register from "./Register";

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
