import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render(){
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
        <Link to="/" className="navbar-brand">Acebook</Link>
          <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/user/new" className="nav-link">Sign Up</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user/login" className="nav-link">Login</Link>
            </li>
          </ul>
          </div>
        </div>
      
      </nav>
    );
  }
}
