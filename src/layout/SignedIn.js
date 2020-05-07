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
    db.collection('vendors').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(doc => {
        if (doc.doc.data().email === email) {
                  setUserDetails({...doc.doc.data(), id: doc.doc.id});
                }
      });
    });
    db.collection('users').onSnapshot(snapshot => {
      let changes = snapshot.docChanges();
      changes.forEach(doc => {
        if (doc.doc.data().email === email) {
                  setUserDetails({...doc.doc.data(), id: doc.doc.id});
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
