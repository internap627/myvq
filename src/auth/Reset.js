import React, { useState } from "react";
// import { withRouter } from "react-router";
import firebase from "../config/fbConfig";
import "./Login.css";

export default function Reset({ handleReset }) {
    const [details, setDetails] = useState({
        email: ""
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
          .sendPasswordResetEmail(details.email)
          .then(() => {
            alert("Please check your email", handleReset());
          })
          .catch((err) => {
            console.log(err);
          });
      };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="input-field">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={details.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-btn input-field">
        <button className="btn yellow darken-1 z-depth-0">Reset</button>
        <div className="reset-links">
          <p onClick={handleReset}>Cancel</p>
          <p >Submit</p>
        </div>
      </div>
    </form>
  );
}
