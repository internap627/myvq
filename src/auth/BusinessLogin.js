import React, { useState } from "react";
import { withRouter } from "react-router";
import firebase from "../config/fbConfig";
import "./BusinessLogin.css";
import downArrow from "../images/taskmaster_ico.png"

function BusinessLogin({ toggleBusiness, toggleBusinessReg }) {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    user: {},
  });

  const handleChange = (e) => {
    let val = { [e.target.id]: e.target.value };

    setDetails({
      ...details,
      ...val,
    });
    console.log(details);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(details.email, details.password)
      .then((u) => {
        console.log(u.user);
      })
      .catch((err) => {
        alert("Invalid email/password.");
        setDetails({ email: "", password: "" });
      });
  };

  return (
    <div className="business-login-container">
      <nav className="nav-wrapper white">
      <h5 className="center">VQ, your in-line manager</h5>
      </nav>
      <div className="business-hero"></div>

      <div className="task-master">
          <h3>Quick Tutorial</h3>
          <img src={downArrow} alt="down arrow" />
      </div>

      <form className="business-login-form" onSubmit={handleSubmit}>
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
        <div className="form-btn input-field">
          <button className="btn light-blue darken-4 z-depth-0">Sign In</button>
          <div className="reset-links">
            <p onClick={toggleBusiness}>Not a Business?</p>
            <p onClick={toggleBusinessReg}>Register Business</p>
          </div>
        </div>
      </form>
      <div className="bubbles">
        <div>
          Vendors can register for thier customers convience and safety.
        </div>
        <div>
          Get in line online to secure your place. Shop with ease and in safety.
        </div>
      </div>
    </div>
  );
}

export default withRouter(BusinessLogin);