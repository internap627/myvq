import React from "react";
import massypromo2 from "../images/massypromo2.png";
import "./Ticket.css";

export default function Ticket({ vendor, user, handleTicket }) {
    function padDigits(number, digits) {
        return "#A" + Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

  const newTicket = vendor && padDigits(vendor.queue.length + 1, 4);
  const totalTickets = vendor && padDigits(vendor.queue.length, 4);

  

  return (
    <div onClick={() => handleTicket()}>
      <div className="ticket-hero">
      <i onClick={handleTicket} className="material-icons">arrow_back</i>
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
          <h4>YOU ARE CUSTOMER :</h4>
          <h3>{newTicket}</h3>
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
    </div>
  );
}
