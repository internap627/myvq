import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import firebase from "../config/fbConfig";
import './SignedOut.css'

function SignedOut() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
    user: {}
  });

  const handleChange = (e) => {
    let val = {[e.target.id]: e.target.value}

    setDetails({
        ...details, ...val
    });
    console.log(details)
};

    const handleSubmit = (e) => {
      e.preventDefault();
        console.log(details)
      firebase
        .auth()
        .signInWithEmailAndPassword(details.email, details.password)
        .then((u) => {
          console.log(u);
        //   this.props.history.push('/')
        })
        .catch((err) => {
          alert("Invalid email/password.");
          setDetails({ email: "", password: "" });
        });
    };
  
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
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
          <button className="btn yellow darken-1 z-depth-0">Submit</button>
          <div className='reset-links'>
              <p>Forgot ID/password?</p>
              <p>Register</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default withRouter(SignedOut);
