import React from "react";
import { Link } from "react-router-dom";
// import SignedInLinks from './SignedInLinks'
import SignedOut from "./SignedOut";
import "./Nav.css";

const Nav = ({ user }) => {
  const initials = user && user.email[0].toUpperCase();
  return (
    <div className="navbar-fixed">
        {/* <div className='container'>
                <Link to='/' className="brand-logo left">Multisig</Link>
                {user? <SignedInLinks initials={initials}/> :
                <SignedOutLinks/>}
            </div> */}
        <SignedOut />
    </div>
  );
};

export default Nav;
