import React, { Component } from 'react';
import axios from "axios";

export default class userSignup extends Component {

  constructor(props) {
    super(props);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkPasswordSame = this.checkPasswordSame.bind(this);

    this.state = {
     firstName: '',
     lastName: '',
     email: '',
     password: '',
     confirmPassword: '',
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

  onChangeConfirmPassword(e) {
      this.setState({
      confirmPassword: e.target.value
    });
  }

  checkPasswordSame(e){
    e.preventDefault();
    var password = this.state.password
    var confirmPassword = this.state.confirmPassword
    if(password.length >= 6){
      if(password === confirmPassword){
        this.onSubmit();
      } else{
        alert('The password fields do not match. Try again.')
      }
    }else{
      alert('Passwords must be a minimum of 6 characters. Try again.')
    }
  }


  onSubmit() {
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
        document.getElementById('email-error').innerHTML = "Sorry this username already exists, please click <a href='/user/login'>here</a> to login";
      }
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
    var passwordInput2 = document.getElementById("password-id2");
    if (passwordInput2.type === "password") {
      passwordInput2.type = "text";
    } else {
      passwordInput2.type = "password";
    }
    }

  render() {
    return (
      <div className="col-md-6 offset-md-3"> 
        <center>
        <h3>Sign up to Acebook</h3>
        </center>
        <form onSubmit = {this.checkPasswordSame}>
          <div className="form-group">
            <label>First Name:</label>
            <input type="text"
                   placeholder = "First Name"
                   required
                   className="form-control"
                   value={this.state.firsName}
                   onChange={this.onChangeFirstName}>
            </input>
           
            <label>Last Name:</label>
            <input type="text"
                   placeholder = "Last Name"
                   required
                   className="form-control"
                   value={this.state.lastName}
                   onChange={this.onChangeLastName}>
            </input>

            <label>Email:</label>  <div id="email-error"></div>
            <input type="email"
                   placeholder = "Email"
                   required
                   className="form-control"
                   value={this.state.email}
                   onChange={this.onChangeEmail}>
            </input>
            <label>Password:</label>
            <input type="password"
                   placeholder = "Password"
                   required
                   id="password-id"
                   className="form-control"
                   value={this.state.password}
                   onChange={this.onChangePassword}>
            </input>
            <label>Confirm Password:</label>
            <input type="password"
                   placeholder = "Confirm Password"
                   required
                   id="password-id2"
                   className="form-control"
                   value={this.state.confirmPassword}
                   onChange={this.onChangeConfirmPassword}>
            </input>
            <input type="checkbox" onChange={this.showPassword}></input>
            <label>See Password</label>

          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-dark" ></input>
          </div>
        </form>
      </div>
    )
  }
}
