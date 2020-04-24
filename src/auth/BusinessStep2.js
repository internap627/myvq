import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import firebase from "../config/fbConfig";

function BusinessStep2({ toggleForm, toggleStep, details }) {
  const userDetails = details && details;
  const userName = `${userDetails.firstName} ${userDetails.lastName}`;
  const nameLocation = `${userDetails.businessName}, ${userDetails.street}, ${userDetails.parish}`

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(userDetails.email, userDetails.password)
      .then((u) => {
        console.log(u.user.email);
        // this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h4>Congratulations</h4>
        <div className="dots">
          <div className="dot-dark"></div>
          <div className="dot-dark"></div>
          <div className="dot"></div>
        </div>
        <h5>Welcome to the VQ community!</h5>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          {/* <label htmlFor="firstName">First Name</label> */}
          <input
            type="text"
            id="firstName"
            value={userName && userName}
            readOnly
          />
          <span className="helper-text" data-error="wrong" data-success="right">
            Business Owner
          </span>
        </div>
        <div className="input-field">
          {/* <label htmlFor="email">Email</label> */}
          <input type="email" id="email" value={userDetails.email} readOnly />
          <span className="helper-text" data-error="wrong" data-success="right">
            Email
          </span>
        </div>
        <div className="input-field">
          {/* <label htmlFor="lastName">Last Name</label> */}
          <input
            type="text"
            id="category"
            value={userDetails.category}
            readOnly
          />
          <span className="helper-text" data-error="wrong" data-success="right">
            Category
          </span>
        </div>
        <div className="input-field">
          {/* <label htmlFor="lastName">Last Name</label> */}
          <input
            type="text"
            id="nameLocation"
            value={nameLocation && nameLocation}
            readOnly
          />
          <span className="helper-text" data-error="wrong" data-success="right">
            Name and Location
          </span>
        </div>
        <p>
          Please ensure the above details are correct by clicking on “CONFIRM”
          to complete your profile sign up. If your information is incorrect,
          please click on the ”Cancel” button to re-enter your information
        </p>
        <div className="form-btn" id="reg-btns">
          <button
            onClick={toggleForm}
            className="btn light-blue darken-4 z-depth-0"
            id="cancel-btn"
          >
            Cancel
          </button>
          <button className="btn yellow darken-1 z-depth-0">Confirm</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(BusinessStep2);
