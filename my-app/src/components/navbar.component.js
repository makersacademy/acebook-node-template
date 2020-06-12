import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render(){
    return (
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <div className="container">
      //   <Link to="/" className="navbar-brand">Acebook</Link>
      //     <div className="collapse navbar-collapse">
      //     <ul className="navbar-nav mr-auto">
      //       <li className="navbar-item">
      //         <Link to="/user/new" className="nav-link">Sign Up</Link>
      //       </li>
      //       <li className="navbar-item">
      //         <Link to="/user/login" className="nav-link">Login</Link>
      //       </li>
      //     </ul>
      //     </div>
      //   </div>
      
      // </nav>


    <nav className="navbar navbar-expand-lg bg-dark navbar-dark bg-black" id="sideNav">
      <a class="navbar-brand js-scroll-trigger" href="#page-top">
        <span className="d-block"><Link to="/" className="navbar-brand">Acebook</Link></span>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link js-scroll-trigger" href="/user/new">Sign Up</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link js-scroll-trigger" href="/user/login" >Login</a>
              </li>
        </ul>
      </div>
    </nav>
    );
  }
}
