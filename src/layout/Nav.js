import React from "react";
import { Link } from "react-router-dom";
// import SignedInLinks from './SignedInLinks'
import SignedOut from "./SignedOut";
import "./Nav.css";

const Nav = ({ user }) => {
  const initials = user && user.email[0].toUpperCase();
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper white">
        <h5 className="center">Welcome to VQ</h5>
        <div className="hero"></div>
        {/* <div className='container'>
                <Link to='/' className="brand-logo left">Multisig</Link>
                {user? <SignedInLinks initials={initials}/> :
                <SignedOutLinks/>}
            </div> */}
        <SignedOut />
        <div className="bubbles">
          <div>
            Vendors can register for thier customers convience and safety.
          </div>
          <div>
            Get in line online to secure your place.
            Shop with ease and in safety.
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
