import React, { useEffect, useState, Fragment } from "react";
import { db } from "../config/fbConfig";
import Dashboard from "../dashboard/Dashboard";
import BusinessDashboard from "../dashboard/BusinessDashboard";

export default function SignedIn({ user }) {
  const [userDetails, setUserDetails] = useState({});
  const email = user && user.email;

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
    db.collection("users")
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

  return (
    <Fragment>
      {userDetails && userDetails.isVendor ? (
        <BusinessDashboard user={user} userDetails={userDetails} />
      ) : (
        <Dashboard user={user} userDetails={userDetails} />
      )}
    </Fragment>
  );
}
