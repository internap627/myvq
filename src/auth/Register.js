import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import Step1 from "./Step1";
import Step2 from "./Step2";

function Register({ toggleForm }) {
  const [toggle, setToggle] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const handleDetails = (data) => {
    setUserDetails(data);
  };

  const toggleStep = () => {
    setToggle(!toggle);
  };

  return (
    toggle ? <Step1
      toggleForm={toggleForm}
      toggleStep={toggleStep}
      handleDetails={handleDetails}
    /> : <Step2 details={userDetails} toggleForm={toggleForm} />
  );
}

export default withRouter(Register);
