import React, { useState } from "react";
import { withRouter } from "react-router";
import Step1 from "./Step1";
import Step2 from "./Step2";

function Register({ toggleUserForm }) {
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
      toggleUserForm={toggleUserForm}
      toggleStep={toggleStep}
      handleDetails={handleDetails}
    /> : <Step2 details={userDetails} toggleForm={toggleUserForm} />
  );
}

export default withRouter(Register);
