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
    console.log("hey");
    console.log(user);

    axios({
      url: '/api/user/new',
      method: 'POST',
      data: user
    })

    .then(response => {
      console.log('Data has sent to server');
      console.log(response);
    })
    .catch(err => {
      console.log(err)
    });
   

  };

  render() {
    return ( 
      <div >
        <h3>Hello myFriend!</h3>
        <form onSubmit = {this.onSubmit}>
          <div className="form-group">

            <label>email:</label>
            <input type="text"
                   required
                   className="form-control"
                   value={this.state.email}
                   onChange={this.onChangeEmail}> 
            </input>
            <label>Password:</label>
            <input type="text"
                   required
                   className="form-control"
                   value={this.state.password}
                   onChange={this.onChangePassword}> 
            </input>
          </div>
          
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary" ></input>
          </div>
        </form>
      </div>
    )
  }
}
