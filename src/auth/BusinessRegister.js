import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import BusinessStep1 from "./BusinessStep1";
import BusinessStep2 from "./BusinessStep2";

function BusinessRegister({ toggleUserForm }) {
  const [toggle, setToggle] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  const handleDetails = (data) => {
    setUserDetails(data);
  };

  const toggleStep = () => {
    setToggle(!toggle);
  };

  return (
    toggle ? <BusinessStep1
      toggleUserForm={toggleUserForm}
      toggleStep={toggleStep}
      handleDetails={handleDetails}
    /> : <BusinessStep2 details={userDetails} toggleForm={toggleUserForm} />
  );
}

export default withRouter(BusinessRegister);