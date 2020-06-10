import React, { Component } from 'react';
import axios from "axios";

export default class userLogin extends Component {
  
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
     email: '',
     password: '',
    }
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
      email: this.state.email,
      password: this.state.password
    }
    console.log("hey");
    console.log(user);

    axios({
      url: '/api/user/login',
      method: 'POST',
      data: user
    })

    .then(response => {
      console.log('Data has sent to server');
      console.log(response.data);
      console.log("hello")

      if(response.data.email === this.state.email){
        alert("OKEY")
        window.location.replace("/posts/" + response.data._id) 
      }else if(response.data ==="wrong password") {
        alert(response.data)
      }else{
        alert("no user with that email, please signup or try again")
      }
          
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
        <a href="/user/new" >Signup</a> 
        <a href="/posts" >Go to posts without login</a> 
      </div>
    )
  }
}
