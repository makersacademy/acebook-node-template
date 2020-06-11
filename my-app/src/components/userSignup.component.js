import React, { Component } from 'react';
import axios from "axios";

export default class userSignup extends Component {

  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
     firstName: '',
     lastName: '',
     email: '',
     password: '',
    }
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }
  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }


  onSubmit(e) {
    e.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }

    axios({
      url: '/api/user/new',
      method: 'POST',
      data: user
    })

    .then(response => {
      console.log('Data has sent to server');

      if(response.data){
        console.log("redirecting...")
        alert("User already exists, please log in");
      }else{
        alert("User has been created, please log in");
      }
        window.location.replace("/user/login");
    })
    .catch(err => {
      console.log(err)
    });

  };

showPassword() {
    var passwordInput = document.getElementById("password-id");
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
    } else {
      passwordInput.type = "password";
    }
    }

  render() {
    return (
      <div className="col-md-6 offset-md-3"> 
        <h3>Sign up to Acebook</h3>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text"
                   required
                   className="form-control"
                   value={this.state.firsName}
                   onChange={this.onChangeFirstName}>
            </input>
            <label>Last Name:</label>
            <input type="text"
                   required
                   className="form-control"
                   value={this.state.lastName}
                   onChange={this.onChangeLastName}>
            </input>
            <label>Email:</label>
            <input type="text"
                   required
                   className="form-control"
                   value={this.state.email}
                   onChange={this.onChangeEmail}>
            </input>
            <label>Password:</label>
            <input type="password"
                   required
                   id="password-id"
                   className="form-control"
                   value={this.state.password}
                   onChange={this.onChangePassword}>
            </input>
            <input type="checkbox" onChange={this.showPassword}></input>
            <label>Check Password</label>

          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" ></input>
          </div>
        </form>
      </div>
    )
  }
}
