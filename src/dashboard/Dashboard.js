import React, { useState, useEffect, Fragment } from "react";
import firebase from "../config/fbConfig";
import "./Dashboard.css";
import massypromo from "../images/Massy_promo-01.png";
import icons from "../images/icons.js";
import Category from "./Category";
import Ticket from "./Ticket";
import _ from "lodash";

export default function Dashboard({ user, userDetails }) {
  const [vendors, setVendors] = useState([]);
  const [ticketToggle, setTicketToggle] = useState(false);
  const [vendor, setVendor] = useState({});
  const handleTicket = (v) => {
    setTicketToggle(!ticketToggle);
    if (v && v.id) {
      setVendor(v);
    } else {
      setVendor({})
    }
  };

  const email = user && user.email;
  const fullName =
    userDetails && `${userDetails.firstName} ${userDetails.lastName}`;
  const categoryList = Object.entries(icons).map((arr) => {
    const vendorList = vendors && vendors.find((v) => v.category === arr[0]);
    if (vendorList && vendorList.vendors.length > 0) {
      return (
        <Category
          data={arr}
          key={arr[0]}
          vendorList={vendorList}
          user={userDetails}
          handleTicket={handleTicket}
        />
      );
    }
  });

  useEffect(() => {
    setTimeout(function () {
      fetchGroups();
    }, 1000);

    setTimeout(function () {
      let elems = document.querySelectorAll(".collapsible");
      window.M.Collapsible.init(elems);

      let elemsSlide = document.querySelectorAll(".sidenav");
      window.M.Sidenav.init(elemsSlide);
    }, 2000);
  }, [vendor]);

  const fetchGroups = () => {
    firebase
      .firestore()
      .collection("vendors")
      .get()
      .then((snapshot) => {
        let data = [];
        snapshot.docs.forEach((item) => {
          const getItemData = item.data();

          data.push({ ...getItemData, id: item.id });
        });
        let result = _(data)
          .groupBy((x) => x.category)
          .map((value, key) => ({ category: key, vendors: value }))
          .value();
        setVendors(result);
      });
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <Fragment>
      <div className="dash-container">
        <nav className="nav-wrapper amber accent-3">
          <button data-target="slide-out" className="sidenav-trigger">
            <i className="material-icons">apps</i>
          </button>
          <h5 className="center">Welcome back to VQ</h5>
        </nav>

        <ul id="slide-out" className="sidenav">
          <li>
            <div className="user-view z-depth-2">
              <div className="avatar">
                <i className="material-icons">person</i>
              </div>
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

        {ticketToggle ? (
          <Ticket
            vendor={vendor}
            user={userDetails}
            handleTicket={handleTicket}
          />
        ) : (
          <Fragment>
            <div className="dashboard-hero">
              <img src={massypromo} alt="logo" />
            </div>
            <div className="business-dash-body">
              <ul className="collapsible">
                {categoryList}

                <li>
                  <div className="collapsible-header">
                    Instructions
                    <i className="material-icons">arrow_drop_down</i>
                  </div>
                  <div className="collapsible-body">
                    <p>
                      Please select the Business Category you wish to browse
                      from, in the above dropdown menu. <br /> <br />
                      There you can select your preferred vendor and reserve
                      your spot in line or lines you may have to wait in today.{" "}
                      <br /> <br />
                      Once in line we will provide a guesstimate time for you to
                      arrive at your location to ensure you can access the
                      chosen vendor, with minimum exposure to large outdoor
                      crowds. <br /> <br />
                      Thanks for choosing VQ and we hope you have an amazing
                      day.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
