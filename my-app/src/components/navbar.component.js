import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {


  submit = (event) => {
    event.preventDefault(); 
    window.location.assign('http://localhost:3000/user/login')
  }

  render(){

    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Acebook</Link>
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/user/new" className="nav-link">Sign Up</Link>
        </li>
        <li className="navbar-item">
          <Link to="/user/login" className="nav-link">Login</Link>
        </li>
        {(() => {
          if(window.location.pathname.length === 31 ){
            return(
            <div id= "logout" >
              <li className="navbar-item">
                 <Link to="/user/login" className="nav-link" onClick={this.submit} >Logout</Link>
              </li>
            </div> )}
         })()}
      </ul>
      </div>
    </nav>
    );
  }
}
