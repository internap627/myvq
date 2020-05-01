import React, { useEffect, useState } from "react";
import firebase from "../config/fbConfig";
import QRshow from "../auth/QRshow";
import "./Dashboard.css";
import { db } from "../config/fbConfig";
import massypromo from "../images/Massy_promo-01.png";
import massylogo from "../images/massy_logo_01.png"
import icons from "../images/icons.js"

export default function Dashboard({ user }) {
  // const name = user && user.firstName;

  const email = user && user.email;

  const [userDetails, setUserDetails] = useState({});
  const nameLocation =
    userDetails &&
    `${userDetails.businessName}, ${userDetails.street}, ${userDetails.parish}`;
  const businessName = userDetails && userDetails.businessName;
  const location =
    userDetails && `${userDetails.street}, ${userDetails.parish}`;
  const fullName =
    userDetails && `${userDetails.firstName} ${userDetails.lastName}`;

  useEffect(() => {
    getUser();

    let elems = document.querySelectorAll(".collapsible");
    window.M.Collapsible.init(elems);

    let elemsSlide = document.querySelectorAll(".sidenav");
    window.M.Sidenav.init(elemsSlide);
  }, [user]);

  const getUser = () => {
    db.collection("vendors")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          const getItemData = item.data();
          if (getItemData.email === email) {
            setUserDetails(getItemData);
          }
        });
      });
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="business-dash-container">
      <nav className="nav-wrapper light-blue darken-4">
        <button data-target="slide-out" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </button>
        <h5 className="center">
          Welcome back to VQ
        </h5>
      </nav>

      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="logo">
              <img src={massylogo} alt="logo"/>
            </div>
            {/* <a href="#user"><img class="circle" src="images/yuna.jpg"/></a> */}
            <a href="#name">
              <span className="white-text name">{fullName}</span>
            </a>
            <a href="#email">
              <span className="white-text email">{email}</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#!" className="sidenav-close" onClick={logout}>
            <i className="material-icons">exit_to_app</i>Logout
          </a>
        </li>
        <li>
          <div className="divider"></div>
        </li>
      </ul>

      <div className="business-qr">
        <QRshow data={nameLocation} />
      </div>
      <div className="business-dash-body">
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              Business Info
              <i className="material-icons">arrow_drop_down</i>
            </div>
            <div className="collapsible-body">
              <div className="heading">
                <span><img src={icons[userDetails.category]} alt="icon"/></span>
                {userDetails.category}
              </div>
              <div className="business-data">
                <p>{businessName}</p>
                <p>{location}</p>
              </div>
              <div className="queue-data">
                <p>Last waiting time :</p>
                <p>Number of people in line :</p>
                <p>Customer being served :</p>
                <p>Total number served today:</p>
                <div className="light-blue darken-4 btn">
                  <i className="material-icons">person</i>
                  #A0897
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              Ad View
              <i className="material-icons">arrow_drop_down</i>
            </div>
            <div className="collapsible-body">
              <div className="ad-promo">
                <img src={massypromo} alt="promo" />
              </div>
            </div>
          </li>
          <li>
            <div className="collapsible-header">
              Instructions
              <i className="material-icons">arrow_drop_down</i>
            </div>
            <div className="collapsible-body">
              <p>
                To activate your line manger, simply print out a 6” x “6 square
                sized copy of your above business QR code, and place or adhere
                it to a prominent location at the entrance of your business.{" "}
                <br />
                <br /> If you are unable to print out a copy of your QR code,
                simply use the above home page QR code for your customers
                accepting goods, to scan directly. This will confirm they are
                being served. Once finished the customer will need to “tap out”
                of line using the VQ ICON on their screen; the next customer in
                line can then be served. <br />
                <br /> Thanks for choosing VQ and have a productive and
                enjoyable day.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
