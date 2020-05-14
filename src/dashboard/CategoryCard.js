import React, { useState, useEffect } from "react";
import icons from "../images/icons";
import "./CategoryCard.css";
import moment from "moment"

export default function CategoryCard({ vendor, user, handleTicket }) {
  function padDigits(number, digits) {
    return (
      "#" +
      Array(Math.max(digits - String(number).length + 1, 0)).join(0) +
      number
    );
  }

  const ticketOpen = new Date().getHours() >= new Date(0 , 0, 0, vendor && vendor.openingTime - 2, 0, 0, 0).getHours() 
  const buttonClosedStyle = {
    backgroundColor: "grey",
    color: "white",
  }

  const newTicket = vendor && padDigits(vendor.queue.length + 1, 4);
  const totalTickets = vendor && padDigits(vendor.queue.length, 4);
  const [buttonStyle, setButtonStyle] = useState({});
  const [ticketData, setTicketData] = useState("");

  useEffect(() => {
    const checkQueue = () => {
      const found = user.queues.find((v) => v.id === vendor.id);
      if (found) {
        setButtonStyle({
          backgroundColor: "#6594FD",
          color: "white",
        });
        setTicketData(found.ticketNumber);
      } else {
        setButtonStyle({
          backgroundColor: "#FFCC04",
          color: "#145084",
        });
        setTicketData("");
      }
    };
    checkQueue();

    setTimeout(function () {
      let elems = document.querySelectorAll(".modal");
      window.M.Modal.init(elems);
    }, 1000);
  }, [user, vendor]);

  return (
    <div className="cat-card">
      <div className="sec1">
        <img src={icons[vendor.category]} alt="icon" />
      </div>
      <div className="sec2">
        <h6>{vendor.businessName}</h6>
        <p>{`${vendor.street}, ${vendor.parish}`}</p>
        <p>Number of people in line: {totalTickets}</p>
      </div>
      <div className="sec3">
        <h6>WT: 01:20:08</h6>
        {ticketData ? (
          <p>IN LINE: {ticketData}</p>
        ) : (
          <p>NEXT UP: {newTicket}</p>
        )}
        {!ticketOpen ?<div
          style={buttonClosedStyle}
          className="z-depth-2 disabled"
        >
          Ticket
        </div> : <div
          style={buttonStyle}
          data-target={vendor.id}
          className="z-depth-2 waves-effect"
          onClick={() => handleTicket(vendor)}
        >
          Ticket
        </div>}
      </div>
    </div>
  );
}
