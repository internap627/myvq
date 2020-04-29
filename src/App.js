import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "./config/fbConfig";
import "./App.css";
import Nav from "./layout/Nav";
const vqLogo = require("./images/VQ_Icon_white_page1.png");

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "bold",
  fontStyle: "italic",
};

function App() {
  const [splashActive, setSplashActive] = useState(true);

  const toggleSplash = () => {
    setSplashActive(!splashActive);
  };

  return (
    <Router>
      <div className="page">
        <div className="app">
          {splashActive ? (
            <div className="splash">
              <img alt="logo" src={vqLogo} />
              <div className="text">
                <h4>Welcome to VQ!</h4>

                <p>
                  VQ, is your “Virtual Queue” assistant. It allows you to
                  reserve your place in line from your mobile device.
                </p>

                <p>
                  VQ members can select from a list of their preferred
                  Supermarkets, Banks, Barbers, Local Businesses or Vendors, to
                  secure their spot in line from anywhere in Barbados.
                </p>

                <p>
                  Become a member or register your business{" "}
                  <Link style={linkStyle} onClick={toggleSplash}>
                    here
                  </Link>{". "}
                  Once registered, members can select a business in order to
                  reserve their place in line without having to physically be
                  there.
                </p>
              </div>
            </div>
          ) : (
            <Nav />
          )}
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
