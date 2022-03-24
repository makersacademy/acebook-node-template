import React from 'react';
import {Link, useNavigate} from 'react-router-dom';


const NavBar = ()=> {
const navigate = useNavigate()
const user = localStorage.getItem("user")
const renderList = () =>{
  if(user){
    return[
      <li key="home"><Link to="/">Home</Link></li>,
      <li key="profile"><Link to="/profile">Profile</Link></li>,
      <li key="timeline"><Link to="/timeline">Timeline</Link></li>,
      <li key="photos"><Link to="/photos">Photos</Link></li>,
      <li key="logout">
      <button className="btn waves-effect waves-light #1976d2 blue darken-2"
      onClick={()=> {
        localStorage.clear()
        navigate('/signin')
      }}>
       Log Out 
      </button>
      </li>
    ]
  } else {
    return [
      <li key="signin"><Link to="/signin">Sign In</Link></li>,
      <li key="signup"><Link to="/signup">Sign Up</Link></li>
    ]
  }
}
return (
<nav>
<div className="nav-wrapper blue">
  <Link to="#" className="brand-logo left">Maker Mate</Link>
  <ul id="nav-mobile" className="right hide-on-med-and-down">
    {renderList()}
  </ul>
</div>
</nav>
)
}

export default NavBar