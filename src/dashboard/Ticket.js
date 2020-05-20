import React, { useState, useEffect, Fragment } from "react";
import firebase from "../config/fbConfig";
import massypromo2 from "../images/massypromo2.png";
import "./Ticket.css";

export default function Ticket({ vendor, user, handleTicket }) {
  function padDigits(number, digits, str) {
    return (
      str +
      Array(Math.max(digits - String(number).length + 1, 0)).join(0) +
      number
    );
  }
  const calculateTimeLeft = () => {
    const newTime = new Date(0, 0, 0, vendor && vendor.openingTime, 5, vendor && vendor.queue.length + 1 * 20, 0)

    let timeLeft = {};

      timeLeft = {
        hours: padDigits(newTime.getHours(), 2, ""),
        minutes: padDigits(newTime.getMinutes(), 2, ""),
        seconds: padDigits(newTime.getSeconds(), 2, "")
      };
    

    return timeLeft;
  };

  const newTicket = vendor && padDigits(vendor.queue.length + 1, 4, "#");
  const totalTickets = vendor && padDigits(vendor.queue.length, 4, "#");
  const [ticketData, setTicketData] = useState("");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  

  useEffect(() => {
    setTimeout(function () {
      let elems = document.querySelectorAll(".modal");
      window.M.Modal.init(elems);
    }, 1000);
  }, [])

  useEffect(() => {
    const checkQueue = () => {
      const found = user && user.queues.find((v) => v.id === vendor.id);
      if (found) {
        setTicketData(found.ticketNumber);
        setTimeLeft(found.timeLeft)
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
      setTimeLeft()
      const userRef = firebase.firestore().collection("users").doc(user.id);
      const vendorRef = firebase
        .firestore()
        .collection("vendors")
        .doc(vendor.id);

      return userRef
        .update({
          queues: [...user.queues, { ...vendor, ticketNumber: newTicket, timeLeft: timeLeft }],
        })
        .then(function () {
          vendorRef
            .update({
              queue: [...vendor.queue, { ...user, ticketNumber: newTicket, timeLeft: timeLeft }],
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
          <h4>ENTRY TIME :</h4>
          {ticketData ? <h3>{`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}</h3> : <h3>00 : 00 : 00</h3>}
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
