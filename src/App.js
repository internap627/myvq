import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "./config/fbConfig";
import "./App.css";
import Nav from "./layout/Nav"
const vqLogo = require("./images/VQ_Icon_white_page1.png");

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "bold",
  fontStyle: "italic",
};

function App() {
  useEffect(() => {
    authListener();
  });

  const [user, setUser] = useState( null )
  const [splashActive, setSplashActive] = useState( true )


  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser( user );
      } else {
        setUser( null );
      }
    });
  };

  const storeUser = (user) => {
    setUser( user )
  }

  const toggleSplash = () => {
    setSplashActive(
      !splashActive
    )
  }

  return (
    <Router>
      <div className="page">
        <div className="app">
          {splashActive ? <div className="splash">
            <img alt="logo" src={vqLogo} />
            <div className="text">
              <h4>Welcome to Virtual Que!</h4>

              <p>
                Register your business{" "}
                <Link style={linkStyle} to="/users" onClick={toggleSplash}>
                  here
                </Link>{" "}
                to access our easy to use Social Distancing Virtual Line Up
                tool.
              </p>

              <p>
                Once your business is registered, our growing user base will be
                able to select you from our expanding vendor’s list, and easily
                hop in line out the front of your business, online.
              </p>

              <p>
                Customers can then wait in line from the comfort of their home,
                car, or whilst doing other activities. To get started simply
                click{" "}
                <Link style={linkStyle} to="/users" onClick={toggleSplash}>
                  here
                </Link>
                .
              </p>
            </div>
          </div> : <Nav />}
        </div>

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">{/* <About /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
