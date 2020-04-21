import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import "./BusinessStep1.css";

function BusinessStep1({ toggleUserForm, toggleStep, handleDetails }) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    category: "",
    businessName: "",
    user: {},
  });

  const handleChange = (e) => {
    let val = { [e.target.id]: e.target.value };

    setDetails({
      ...details,
      ...val,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleStep();
    handleDetails(details);
    console.log(details)
  };

  return (
    <div className="container">
      <div className="heading">
        <h4>Let's get you started</h4>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <h5>Please provide the following info to join VQ.</h5>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={details.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={details.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="input-field" id="select-input">
          <select
            onChange={handleChange}
            defaultValue="label"
            id="category"
          >
            <option value="label" disabled>
              Business Category
            </option>
            <option value="Supermarket">SuperMarket</option>
            <option value="Hardware">Hardware</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>
        </div>
        <div className="input-field">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            value={details.businessName}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={details.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={details.password}
            onChange={handleChange}
          />
        </div>
        <p>
          Please fill out the above details and confirm by clicking on
          “Continue” to proceed. <br />
          If you are not yet ready to proceed, please click on the ”Cancel”
          button
        </p>
        <div className="form-btn input-field" id="reg-btns">
          <button
            onClick={toggleUserForm}
            className="btn light-blue darken-4 z-depth-0"
            id="cancel-btn"
          >
            Cancel
          </button>
          <button className="btn yellow darken-1 z-depth-0">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(BusinessStep1);
