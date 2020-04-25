import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

function BusinessStep1({ toggleUserForm, toggleStep, handleDetails }) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    category: "",
    businessName: "",
    street: "",
    parish: "",
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
    if (details.password !== details.confirmPassword) {
      alert("The passwords don't match");
      return false; // The form won't submit
    }
    toggleStep();
    handleDetails(details);
  };

  return (
    <div className="container">
      <div className="header">
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
          <select onChange={handleChange} defaultValue="label" id="category">
            <option value="label" disabled>
              Business Category
            </option>
            <option value="Supermarket">Supermarket</option>
            <option value="Convenience Store">Convenience Store</option>
            <option value="Local Village Shop">Local Village Shop</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Bank">Bank</option>
            <option value="Coconut Vendor">Coconut Vendor</option>
            <option value="Fruit &#38; Veg Vendor">
              Fruit &#38; Veg Vendor
            </option>
            <option value="Fish &#38; Meat Market">
              Fish &#38; Meat Market
            </option>
            <option value="Hardware Store">Hardware Store</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Doctor Office">Doctor's Office</option>
            <option value="Dentist Office">Dentist's Office</option>
            <option value="Government Office">Government Office</option>
            <option value="Night Club &#38; Seasonal Fetes">
              Night Club &#38; Seasonal Fetes
            </option>
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
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            value={details.street}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="parish">Parish</label>
          <input
            type="text"
            id="parish"
            value={details.parish}
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
        <div className="input-field">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={details.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <p>
          Please fill out the above details and confirm by clicking on
          “Continue” to proceed. <br />
          If you are not yet ready to proceed, please click on the ”Cancel”
          button
        </p>
        <div className="form-btn" id="reg-btns">
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
