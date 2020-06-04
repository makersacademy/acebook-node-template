import React, { Component } from 'react';

export default class CreatePosts extends Component {

  constructor(props) {
    super(props);

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      message: ''
    }
  }

// taking the input value
  onChangeMessage(e) {
    this.setState({
      message: e.target.value
      // updates message element within the state
    });
  }

// sending the value to the database (eventually)
  onSubmit(e) {
    e.preventDefault(); //prevents default html submit form behaviour

    const post = {
      message: this.state.message
    }

    console.log(post); // will submit this to the database eventually

    window.location = '/posts'; // redirect user to posts homepage
  }


  render() {
    return (
      <div>
        <h3> Create a new post! </h3>
        <form onSubmit={this.onSubmit}>
         <div className="form-group">
         <label>Message: </label>
         <input
             type="text"
             id="message"
             value={this.state.message}
             onChange={this.onChangeMessage}
         />
         </div>
         <div className="form-group">
         <input
             type="submit"
             id="submit"
             onChange={this.onSubmit}
         />
         </div>
        </form>
      </div>
    )
  }
}
