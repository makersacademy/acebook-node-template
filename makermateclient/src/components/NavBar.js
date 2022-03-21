import React from 'react';
import {Link} from 'react-router-dom';


const NavBar = ()=> {
  return(
<nav>
<div className="nav-wrapper blue">
  <Link to="#" className="brand-logo left">Maker Mate</Link>
  <ul id="nav-mobile" className="right hide-on-med-and-down">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/profile">Profile</Link></li>
    <li><Link to="/timeline">Timeline</Link></li>
    <li><Link to="/signin">Sign In</Link></li>
    <li><Link to="/signup">Sign Up</Link></li>
  </ul>
</div>
</nav>
  )
}

export default NavBar