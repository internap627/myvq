import React, { useState, useEffect, Fragment } from "react";
import firebase from "../config/fbConfig";
import massypromo2 from "../images/massypromo2.png";
import "./Ticket.css";

export default function Ticket({ vendor, user, handleTicket }) {
  function padDigits(number, digits) {
    return (
      "#" +
      Array(Math.max(digits - String(number).length + 1, 0)).join(0) +
      number
    );
  }

  const newTicket = vendor && padDigits(vendor.queue.length + 1, 4);
  const totalTickets = vendor && padDigits(vendor.queue.length, 4);
  const [ticketData, setTicketData] = useState("");

  useEffect(() => {
    setTimeout(function () {
      let elems = document.querySelectorAll(".modal");
      window.M.Modal.init(elems);
    }, 1000);
  }, [])

  useEffect(() => {
    const checkQueue = () => {
      const found = user.queues.find((v) => v.id === vendor.id);
      if (found) {
        setTicketData(found.ticketNumber);
      } else {
        setTicketData("");
      }
    };
    checkQueue();
  });

  const lineUp = () => {
    const found = user.queues.find((v) => v.id === vendor.id);

    if (found) {
      window.M.toast({ html: `You are already in this queue.` });
    } else {
      const userRef = firebase.firestore().collection("users").doc(user.id);
      const vendorRef = firebase
        .firestore()
        .collection("vendors")
        .doc(vendor.id);

      return userRef
        .update({
          queues: [...user.queues, { ...vendor, ticketNumber: newTicket }],
        })
        .then(function () {
          vendorRef
            .update({
              queue: [...vendor.queue, { ...user, ticketNumber: newTicket }],
            })
            .then(() => {
              console.log("Added to both queues");
            })
            .catch(function (error) {
              console.error("Error updating document: ", error);
            });
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    }
  };

  return (
    <div>
      <div className="ticket-hero">
        <i onClick={handleTicket} className="material-icons">
          arrow_back
        </i>
        <div className="img z-depth-2">
          <img src={massypromo2} alt="logo" />
        </div>
        <p>
          <span>{vendor.businessName}</span>{" "}
          {`, ${vendor.street}, ${vendor.parish}`}
        </p>
      </div>
      <div className="ticket-body">
        <div className="sec1">
          {ticketData ? (
            <Fragment>
              <h4>YOU ARE CUSTOMER: {ticketData}</h4>
              <h3>{ticketData}</h3>
            </Fragment>
          ) : (
            <Fragment>
              <h4 data-target={vendor.id} className="modal-trigger">CLICK HERE TO LINE UP</h4>
              <h3>{newTicket}</h3>
            </Fragment>
          )}
        </div>
        <div className="sec2">
          <h4>CURRENTLY SERVING CUSTOMER :</h4>
          <h3>{totalTickets}</h3>
        </div>
        <div className="sec3">
          <h4>EXPECTED WAIT TIME :</h4>
          <h3>01 : 20 : 08</h3>
        </div>
      </div>

      <div id={vendor.id} className="modal">
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
      </div>
    </div>
  );
}
