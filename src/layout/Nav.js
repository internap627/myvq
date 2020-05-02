import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "../config/fbConfig";
// import SignedInLinks from './SignedInLinks'
import SignedOut from "./SignedOut";
import "./Nav.css";
import SignedIn from "./SignedIn";

const Nav = () => {
  useEffect(() => {
    authListener();
  });

  // const initials = user && user.email[0].toUpperCase();
  const [user, setUser] = useState(null);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  // const storeUser = (user) => {
  //   setUser( user )
  // }
  return (
    <div >
      {user ?
      <SignedIn user={user} /> :
      <SignedOut />}
    </div>
  );
};

export default Nav;
