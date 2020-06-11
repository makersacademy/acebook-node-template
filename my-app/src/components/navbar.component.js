import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

export default class Navbar extends Component {
  render(){
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/" className="navbar-brand">Acebook</Link>
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav mr-auto">
        <li clasName="navbar-item">
          <Link to="/user/new" className="nav-link">Signup</Link>
        </li>
        <li className="navbar-item">
          <Link to="/user/login" className="nav-link">Login</Link>
        </li>
      </ul>
      </div>
      </nav>
    );
  }
}
