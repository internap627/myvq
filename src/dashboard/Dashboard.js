import React, { useEffect, useState } from "react";
import firebase from "../config/fbConfig";
import QRshow from "../auth/QRshow";
import "./Dashboard.css";
import { db } from "../config/fbConfig";

export default function Dashboard({ user }) {
  // const name = user && user.firstName;

  const email = user && user.email;

  const [userDetails, setUserDetails] = useState({});
  const nameLocation =
    userDetails && `${userDetails.businessName}, ${userDetails.street}, ${userDetails.parish}`;
    const businessName = userDetails && userDetails.businessName
    const location = userDetails && `${userDetails.street}, ${userDetails.parish}`

  useEffect(() => {
    getUser();

    let elems = document.querySelectorAll(".collapsible");
    window.M.Collapsible.init(elems);
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
    // <div onClick={logout}>
    //     Welcome to the Dashboard {name}
    // </div>
    <div className="business-dash-container">
      <nav className="nav-wrapper light-blue darken-4">
        <h5 onClick={logout} className="center">
          Welcome back to VQ
        </h5>
      </nav>

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
                <i className="material-icons">shopping_cart</i>
                {userDetails.category}
              </div>
              <div className="business-data">
                <p>
                    {businessName}
                </p>
                <p>
                    {location}
                </p>
              </div>
              <div className="queue-data">
                <p>
                    Last waiting time :
                </p>
                <p>
                    Number of people in line :
                </p>
                <p>
                    Customer being served :
                </p>
                <p>
                    Total number served today:
                </p>
                <div className="light-blue darken-4 btn pulse">
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
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
