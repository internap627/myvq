import React, { useState, useEffect } from "react";
import icons from "../images/icons";
import "./CategoryCard.css";
import firebase from "../config/fbConfig";

export default function CategoryCard({ vendor, user, handleTicket }) {
//   const [buttonStyle, setButtonStyle] = useState({});

  useEffect(() => {
    // checkQueue();
    setTimeout(function () {
      let elems = document.querySelectorAll(".modal");
      window.M.Modal.init(elems);
    }, 2000);
  }, []);

//   const checkQueue = () => {
//     const found = user.queues.find((v) => v.id === vendor.id);
//     if (found) {
//       setButtonStyle({
//         backgroundColor: "grey",
//         color: "white",
//       });
//     } else {
//       setButtonStyle({
//         backgroundColor: "#6594FD",
//         color: "white",
//       });
//     }
//   };

  const lineUp = () => {
    const found = user.queues.find((v) => v.id === vendor.id);

    if (found) {
      window.M.toast({ html: `You are already in this queue.` });
    } else {
      const userRef = firebase.firestore().collection("users").doc(user.id);

      return userRef
        .update({
          queues: [...user.queues, vendor],
        })
        .then(function () {
          console.log("Document successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    }
  };

  return (
    <div className="cat-card">
      <div className="sec1">
        <img src={icons[vendor.category]} alt="icon" />
      </div>
      <div className="sec2">
        <h6>{vendor.businessName}</h6>
        <p>{`${vendor.street}, ${vendor.parish}`}</p>
        <p>Number of people in line:</p>
      </div>
      <div className="sec3">
        <h6>WT:</h6>
        <div
        //   style={buttonStyle}
        //   data-target={vendor.id}
          className="z-depth-2 waves-effect"
          onClick={() => handleTicket(vendor)}
        >
          Ticket
        </div>
      </div>

      {/* <div id={vendor.id} className="modal">
        <div className="modal-content">
          <h5>Do you want to get in line?</h5>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Cancel
          </a>

          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={lineUp}
          >
            Confirm
          </a>
        </div>
      </div> */}
    </div>
  );
}
